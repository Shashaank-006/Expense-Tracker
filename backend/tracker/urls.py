from django.urls import path
from . import views

urlpatterns = [
    # Income URLs
    path('incomes/', views.get_incomes, name='get_incomes'),
    path('incomes/create/', views.create_income, name='create_income'),
    path('incomes/<int:pk>/', views.income_detail, name='income_detail'),

    # Expense URLs
    path('expenses/', views.get_Expenses, name='get_Expenses'),
    path('expenses/create/', views.create_expense, name='create_expense'),
    path('expenses/<int:pk>/', views.expense_detail, name='expense_detail'),

    # Auth URLs
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('profile/', views.UserProfileView.as_view(), name = 'profile')
]



