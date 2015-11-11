from django.conf.urls import patterns, include, url
from django.contrib import admin


urlpatterns = patterns('diageoApp.views',
	url(r'^home/.*', 'indexView',name = 'indexView'),
	url(r'^angular/(\w+).html$', 'get_angular_template_view', name = 'angular_template'),
)