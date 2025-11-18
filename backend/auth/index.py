import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import hashlib
from typing import Dict, Any

def hash_password(password: str) -> str:
    """
    Hash password using SHA-256
    """
    return hashlib.sha256(password.encode()).hexdigest()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Business: User authentication and registration API
    Args: event - dict with httpMethod, body
          context - object with request_id attribute
    Returns: HTTP response dict with user data or error
    """
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action', 'login')
    
    database_url = os.environ.get('DATABASE_URL')
    
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if action == 'register':
            name = body_data.get('name')
            email = body_data.get('email')
            phone = body_data.get('phone')
            password = body_data.get('password')
            
            if not all([name, email, phone, password]):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'All fields are required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute("SELECT id FROM users WHERE email = %s", (email,))
            if cur.fetchone():
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Email already exists'}),
                    'isBase64Encoded': False
                }
            
            hashed_password = hash_password(password)
            cur.execute(
                "INSERT INTO users (name, email, phone, password) VALUES (%s, %s, %s, %s) RETURNING id, name, email, phone",
                (name, email, phone, hashed_password)
            )
            user = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'user': dict(user)}),
                'isBase64Encoded': False
            }
        
        elif action == 'login':
            email = body_data.get('email')
            password = body_data.get('password')
            
            if not all([email, password]):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Email and password required'}),
                    'isBase64Encoded': False
                }
            
            hashed_password = hash_password(password)
            cur.execute(
                "SELECT id, name, email, phone FROM users WHERE email = %s AND password = %s",
                (email, hashed_password)
            )
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 401,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Invalid credentials'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'user': dict(user)}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid action'}),
                'isBase64Encoded': False
            }
    
    finally:
        cur.close()
        conn.close()