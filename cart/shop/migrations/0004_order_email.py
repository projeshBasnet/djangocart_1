# Generated by Django 3.1.2 on 2020-10-12 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='email',
            field=models.CharField(default='', max_length=40),
        ),
    ]
