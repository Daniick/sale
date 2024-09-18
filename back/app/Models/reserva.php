<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reserva extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'almuerzo_id'];

    public function estudiante()
    {
        return $this->belongsTo(User::class);
    }

    public function almuerzo()
    {
        return $this->belongsTo(Almuerzo::class);
    }
}
