import json
import logging
from functools import wraps

from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from home.tasks import send_discord
from oauth.models import CustomUser


# import io
# import os
# import random
# import httpx
# from pprint import pprint
# from urllib.parse import urlparse
# from django.shortcuts import get_object_or_404, redirect, render, reverse
# from django.views.decorators.cache import cache_control, cache_page
# from typing import Any, BinaryIO, Callable, Optional, Union
# from django.contrib.auth.decorators import login_required
# from django.core import serializers
# from django.core.paginator import Paginator
# from django.forms.models import model_to_dict
# from django.views.decorators.http import require_http_methods
# from django.views.decorators.vary import vary_on_cookie, vary_on_headers


log = logging.getLogger("app")
cache_seconds = 60 * 60 * 4


def auth_from_token(view=None, no_fail=False):
    @wraps(view)
    def wrapper(request, *args, **kwargs):
        if getattr(request, "user", None) and request.user.is_authenticated:
            return view(request, *args, **kwargs)
        authorization = (
            request.headers.get("Authorization") or request.headers.get("Token") or request.GET.get("token")
        )
        # log.debug('authorization: %s', authorization)
        if authorization:
            user = CustomUser.objects.filter(authorization=authorization)
            if user:
                request.user = user[0]
                return view(request, *args, **kwargs)
        if not no_fail:
            return JsonResponse({"error": "Invalid Authorization"}, status=401)
        return view(request, *args, **kwargs)

    if view:
        return wrapper
    else:
        return lambda func: auth_from_token(func, no_fail)


# @require_http_methods(["OPTIONS", "POST"])
# @csrf_exempt
# @login_required
# @auth_from_token


@csrf_exempt
def api_view(request):
    """
    View  /api/
    """
    log.debug("api_view: %s - %s", request.method, request.META["PATH_INFO"])
    log.debug("-" * 20)

    try:
        log.debug("-" * 20 + "\n" + json.dumps(request.META) + "\n")
    except:  # noqa: E722
        log.debug("*" * 20)
        log.debug(request.META)
    log.debug("-" * 20)

    try:
        log.debug("-" * 20 + "\n" + request.body.decode("utf-8") + "\n")
    except:  # noqa: E722
        log.debug("*" * 20)
        log.debug(request.body)
    log.debug("-" * 20)

    try:
        log.debug(json.loads(request.body.decode("utf-8")))
    except:  # noqa: E722
        log.debug("Unable to json.loads - request.body.decode()")
    log.debug("-" * 20)

    try:
        data = json.loads(request.body.decode("utf-8"))
        content = {"content": f"```json\n{data}\n```"}
        send_discord(content, settings.DISCORD_WEBHOOK)
    except Exception as error:
        log.error(error)

    # messages.info(request, 'Welcome Home.')
    return HttpResponse()
