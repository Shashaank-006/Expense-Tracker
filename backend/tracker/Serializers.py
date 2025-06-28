from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Income, Expense, Profile


class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)
    full_name = serializers.CharField(write_only=True, required=False)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'full_name']

    def create(self, validated_data):
        email = validated_data.get('email', '')
        full_name = validated_data.pop('full_name', '')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=email,
            password=validated_data['password'],
        )
        Profile.objects.create(user=user, full_name=full_name)

        return user


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


