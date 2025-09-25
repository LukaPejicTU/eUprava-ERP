from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    Custom permissions to only allow admin users to access a view.
    """
    def has_permissions(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_admin()
