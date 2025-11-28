import jwt
from django.http import JsonResponse

SUPABASE_JWT_SECRET = "5Juewy6kf5O5d+26McM3ASSb6VtrUMnKzhAIE3ZX9VxhHNCdMa+4jaQXdWG4nCpj/RuNzNz+t3lLfJLtGXOQFg==" 
 # get it from Supabase -> Project Settings -> API -> JWT Secret

def require_admin(func):
    def wrapper(*args, **kwargs):
        # Detect if APIView or ViewSet (self, request,…)
        if hasattr(args[0], "request"):
            request = args[0].request
        else:
            request = args[1]

        auth = request.headers.get("Authorization")

        if not auth or not auth.startswith("Bearer "):
            return JsonResponse({"error": "No token"}, status=401)

        token = auth.split(" ")[1]

        try:
            decoded = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"])
            if decoded.get("email") != "mohammedshuaibka@gmail.com":
                return JsonResponse({"error": "Not admin"}, status=403)
        except Exception:
            return JsonResponse({"error": "Invalid token"}, status=401)

        return func(*args, **kwargs)
    return wrapper

