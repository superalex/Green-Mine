# -*- coding: utf-8 -*- 
from django.conf.urls.defaults import patterns, include, url

from greenmine.views import api

urlpatterns = patterns('',
    url(r'^user/list/$', api.UserListApiView.as_view(), name='user-list'),
    url(r'^project/(?P<pslug>[\w\d\-]+)/milestone/(?P<mid>\d+)/task/(?P<taskref>[\w\d]+)/alter/$',
        api.TaskAlterApiView.as_view(), name="task-alter"),
    url(r'^project/(?P<pslug>[\w\d\-]+)/milestone/(?P<mid>\d+)/task/(?P<taskref>[\w\d]+)/reassingn/$',
        api.TaskReasignationsApiView.as_view(), name='task-reassing'),
    url(r'^project/(?P<pslug>[\w\d\-]+)/user-story/(?P<iref>[\w\d]+)/asociate/$',
        api.UserStoryAsociateApiView.as_view(), name="user-story-asociate"),
    url(r'^i18n/lang/$', api.I18NLangChangeApiView.as_view(), 
        name='i18n-setlang'),
    url(r'^password/forgotten/$', 
        api.ForgottenPasswordApiView.as_view(), name='password-forgotten'),

    # Stats
    url(r'^stats/project/(?P<pslug>[\w\d\-]+)/milestone/(?P<mid>\d+)/$',
        api.MilestoneStatsApiView.as_view(), name='stats-milestone'),
)

