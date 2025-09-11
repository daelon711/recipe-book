<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasUuids;


    protected $fillable = ['title', 'description', 'ingredients', 'instructions'];

    protected $casts = [
        'ingredients' => 'array', // auto JSON <-> array
    ];
    // If you pass ['ingredient' => 'flour', 'amount' => '1 cup'], Laravel stores it as {"ingredient":"flour","amount":"1 cup"} in the DB
    // Without $casts, you’d have to use json_encode() and json_decode() every time yourself

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
