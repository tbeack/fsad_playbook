# DELIBERATELY VULNERABLE fixture. Do not deploy.
from django.http import JsonResponse, HttpResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from .models import Note

# VULN: missing @login_required — anyone can list notes
def list_notes(request):
    notes = list(Note.objects.values('id', 'body'))
    return JsonResponse({'notes': notes})

# VULN: SQL injection via raw() with f-string
def search_notes(request):
    q = request.GET.get('q', '')
    notes = list(Note.objects.raw(f"SELECT id, body FROM myapp_note WHERE body LIKE '%{q}%'"))
    return JsonResponse({'results': [{'id': n.id, 'body': n.body} for n in notes]})

# VULN: csrf_exempt on state-changing endpoint
@csrf_exempt
def delete_note(request, note_id):
    try:
        Note.objects.get(id=note_id).delete()
    except Exception:
        # VULN: swallowed exception masks actual error state (DB disconnect, permission, etc.)
        pass
    return JsonResponse({'ok': True})

# VULN: server error leaks stack trace when DEBUG=True
def trigger_error(request):
    return HttpResponse(1 / 0)
