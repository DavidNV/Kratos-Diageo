from django.shortcuts import render
from django.template.loader import render_to_string
from django.http import HttpResponse

# Create your views here.
def indexView(request):
    return render(request, 'base.html')

def get_angular_template_view(request, template):
    rendered = render_to_string('angular/%s.html' % template)
    return HttpResponse(rendered)