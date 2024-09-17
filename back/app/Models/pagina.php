<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pagina extends Model
{
    use HasFactory;



    protected $fillable = [
        'palabra',
        'espanol',
        'ingles',
    ];

    public $timestamps = false;
}
