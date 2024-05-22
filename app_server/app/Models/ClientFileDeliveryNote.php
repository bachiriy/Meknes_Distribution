<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientFileDeliveryNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_file_id',
        'delivery_note_id'
    ];
}
