<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Reserva extends Model
{
    protected $fillable = ['user_id', 'almuerzo_id'];

    public function estudiante()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function almuerzo()
    {
        return $this->belongsTo(Almuerzo::class, 'almuerzo_id');
    }
}
