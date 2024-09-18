<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Almuerzo extends Model
{
    use HasFactory;

    protected $fillable = ['dia_semana', 'menu_descripcion', 'stock'];

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }
}
