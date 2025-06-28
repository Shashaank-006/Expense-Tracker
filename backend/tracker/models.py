from django.db import models
from django.contrib.auth.models import User

class Income(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    amount = models.IntegerField()
    category = models.CharField(max_length=50)
    date = models.DateField()

    def __str__(self):
        return f"{self.title} - ₹{self.amount}"

class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    amount = models.IntegerField();
    category = models.CharField(max_length=50)
    date = models.DateField()

    def __str__(self):
        return f"{self.title} - ₹{self.amount}"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username

