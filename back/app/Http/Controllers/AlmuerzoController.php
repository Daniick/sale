<?php

namespace App\Http\Controllers;

use App\Models\almuerzo;
use Illuminate\Http\Request;

class AlmuerzoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $almuerzos = almuerzo::all();
        return response()->json($almuerzos);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'dia_semana' => 'required',
            'menu_descripcion' => 'required',
            'stock' => 'integer',
        ]);

        $data = $request->all();

        $data = almuerzo::create($data);

        return response()->json(['almuerzo : ' => $data], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(almuerzo $almuerzo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(almuerzo $almuerzo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, almuerzo $almuerzo)
    {
        $request->validate([
            'dia_semana' => 'required',
            'menu_descripcion' => 'required',
            'stock' => 'integer',
        ]);

        $almuerzo = almuerzo::find($almuerzo->id);
        $data = $request->all();

        $almuerzo->update($data);
        return response()->json(['almuerzo : ' => $almuerzo], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            // Buscar el almuerzo por ID
            $almuerzo = Almuerzo::findOrFail($id);

            // Eliminar el almuerzo
            $almuerzo->delete();

            // Respuesta exitosa
            return response()->json([
                'message' => 'Almuerzo eliminado exitosamente.'
            ], 200);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json([
                'message' => 'Error al eliminar el almuerzo.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
