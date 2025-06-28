from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, generics
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Income, Expense, Profile
from .Serializers import IncomeSerializer, ExpenseSerializer, UserRegisterSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# ================================
# Income APIs
# ================================

@api_view(['GET'])
def get_incomes(request):
    incomes = Income.objects.filter(user=request.user)
    serializer = IncomeSerializer(incomes, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_income(request):
    data = request.data.copy()
    data['user'] = request.user.id
    serializer = IncomeSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def income_detail(request, pk):
    try:
        income = Income.objects.get(pk=pk, user=request.user)
    except Income.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = IncomeSerializer(income)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = IncomeSerializer(income, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        income.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ================================
# Expense APIs
# ================================

@api_view(['GET'])
def get_Expenses(request):
    expenses = Expense.objects.filter(user=request.user)
    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_expense(request):
    data = request.data.copy()
    data['user'] = request.user.id
    serializer = ExpenseSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def expense_detail(request, pk):
    try:
        expense = Expense.objects.get(pk=pk, user=request.user)
    except Expense.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = ExpenseSerializer(expense, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ================================
# Register API
# ================================

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

# ================================
# JWT Login API (Token View)
# ================================

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
            return Response({
                "username": user.username,
                "email": user.email,
                "full_name": profile.full_name,
            })
        except Profile.DoesNotExist:
            return Response({
                "username": user.username,
                "email": user.email,
                "full_name": "",
            })




