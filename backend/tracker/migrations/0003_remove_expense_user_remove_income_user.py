# Generated by Django 5.2.3 on 2025-06-23 08:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0002_expense_user_income_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expense',
            name='user',
        ),
        migrations.RemoveField(
            model_name='income',
            name='user',
        ),
    ]
