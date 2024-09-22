<?php

namespace App\Http\Controllers;

use App\Models\Almuerzo;
use App\Models\reserva;
use App\Models\User;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Cargamos las reservas junto con el usuario y el almuerzo asociado
        $reservas = Reserva::with(['estudiante:id,name,email,curso,id_rol', 'almuerzo:id,dia_semana,menu_descripcion'])->get();


        return response()->json($reservas);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar que el usuario y el almuerzo existan
        $almuerzo = Almuerzo::find($request->almuerzo_id);
        $usuario = User::find($request->user_id);

        if (!$almuerzo || !$usuario) {
            return response()->json(['message' => 'Usuario o almuerzo no encontrado'], 404);
        }

        // Comprobar si el usuario ya reservó un almuerzo para ese día de la semana
        $reservaExistente = Reserva::where('user_id', $request->user_id)
            ->whereHas('almuerzo', function ($query) use ($almuerzo) {
                $query->where('dia_semana', $almuerzo->dia_semana); // Comparar día de la semana
            })
            ->first();

        if ($reservaExistente) {
            return response()->json(['message' => 'Ya reservaste un almuerzo para este día de la semana'], 400);
        }

        // Verificar si hay suficiente stock disponible
        if ($almuerzo->stock > 0) {
            // Crear la reserva si todo está correcto
            $reserva = Reserva::create([
                'user_id' => $request->user_id,
                'almuerzo_id' => $request->almuerzo_id,
            ]);

            // Restar del stock del almuerzo
            $almuerzo->stock -= 1;
            $almuerzo->save();

            return response()->json([
                'message' => 'Reserva creada con éxito',
                'stock_restante' => $almuerzo->stock,
            ], 201);
        } else {
            return response()->json(['message' => 'No hay suficiente stock disponible'], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(reserva $reserva)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(reserva $reserva)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, reserva $reserva)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $reserva = Reserva::find($id);
        $reserva->delete();
        return response()->json(['Reserva cancelada: ' => $reserva], 200);
    }
}
