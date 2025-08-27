from rest_framework import permissions

class IsAdminOrManager(permissions.BasePermission):
    """
    Custom permission to only allow admins or managers to create/edit objects.
    All authenticated users can view.
    """

    def has_permission(self, request, view):
        # Allow any authenticated user to make safe requests (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        
        # For unsafe requests (POST, PUT, DELETE), check if the user is admin or manager
        return request.user and (request.user.is_admin() or request.user.has_subordinates())