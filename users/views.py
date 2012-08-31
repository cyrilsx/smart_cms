from django.contrib.auth import logout, login, authenticate
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.template import RequestContext
from form import LoginForm, UserForm
from django.contrib.auth.models import User

USER_TEMPLATE="users/"

def logout(request):
    logout(request)
    return HttpResponseRedirect('/blog/home')


def login_user(request):
    data = {}
    form = LoginForm(request.POST)
    data["form"] = form
    
    if form.is_valid():
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                # call login
                login(request, user)
                return HttpResponseRedirect('/blog/home')
            else:
                data["invalid_login"] = "Account Disabled, contact administrator"
        else:
            # invalid login
            data["invalid_login"] = "Bad credential, username and password don't match"
    
    return render_to_response(USER_TEMPLATE + 'login.html', data, context_instance=RequestContext(request))


def edit_user(request, username=None):
    if username != None:
        edituser = User.objects.get(username=username)
        form = UserForm(request.POST, instance=edituser)
    else:
        edituser = None
        form = UserForm(request.POST)
    data = {}
    data["form"] = form

    if form.is_valid():
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        email = form.cleaned_data['email']

        if edituser == None:
            user = User.objects.create_user(username, email, password)
            user.is_staff = False
            user.is_active = False
        
        user.save()
        return HttpResponseRedirect("/users/edit/" + user.username)
        
    return render_to_response(USER_TEMPLATE + 'edit.html', data, context_instance=RequestContext(request))
    
