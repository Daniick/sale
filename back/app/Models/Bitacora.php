<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bitacora extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'descripcion',
        'fecha',
        'hora',

    ];

    public static function add($descripcion)
    {

        $bitacora = Bitacora::create([
            'descripcion' => $descripcion,
            'fecha' => date('Y-m-d'),
            'hora' => date('H:i:s'),
        ]);
        return $bitacora;
    }
}
