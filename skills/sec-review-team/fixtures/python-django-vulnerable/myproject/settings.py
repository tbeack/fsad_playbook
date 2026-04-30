# DELIBERATELY VULNERABLE fixture. Do not deploy.

# VULN: hardcoded SECRET_KEY
SECRET_KEY = 'django-insecure-x7p9q2w4r6t8y1u3i5o7'

# VULN: DEBUG=True should never be True in production; this file has no env split
DEBUG = True

# VULN: ALLOWED_HOSTS wildcard with DEBUG off would be risky; with DEBUG=True it's moot,
# but the combination is dangerous if DEBUG flips without reviewing ALLOWED_HOSTS.
ALLOWED_HOSTS = ['*']

# VULN: missing security middleware (SecurityMiddleware absent)
MIDDLEWARE = [
    'django.middleware.common.CommonMiddleware',
    # VULN: CsrfViewMiddleware intentionally omitted
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
]

INSTALLED_APPS = ['django.contrib.auth', 'django.contrib.contenttypes', 'django.contrib.sessions', 'myapp']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'app',
        'USER': 'admin',
        # VULN: hardcoded DB password
        'PASSWORD': 'admin123',
        'HOST': 'localhost',
    }
}

# VULN: session cookie missing Secure + HttpOnly + SameSite=Strict
SESSION_COOKIE_SECURE = False
SESSION_COOKIE_HTTPONLY = False

ROOT_URLCONF = 'myproject.urls'
