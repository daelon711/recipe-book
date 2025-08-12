<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;


class RecipeController extends Controller
{
    //need to have logs and like warings and validation

    public function index(Request $request)
    {
        $user = $request->user(); // Authenticated user via Sanctum
        return [
            'user' => $user,
            'recipes' => $user->recipes()->get(), // Assuming User has `hasMany(Recipe::class)`
        ];
    }
    public function store(Request $request)
    {
        Log::info("adding a recipe");
        //validation rules setting up needed
        $validator = Validator::make($request->all(), $this->rules());
        if ($validator->fails()) {
            Log::warning('Recipe validation failed', $validator->errors()->toArray());
            return response()->json(
                ["errors" => $validator->errors()],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        } else {

            $validatedData = $validator->validated();
            $recipe = $this->createRecipe($request->user(), $validatedData);
            $recipe->save();
            return $recipe;
        }
    }



    public function show($id)
    {
        $recipe = Recipe::find($id);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }
        return response()->json($recipe);
    }
    public function destroy($id)
    {
        Log::warning("deleting a recipe");

        $recipe = Recipe::find($id);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }
        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted successfully']);
    }

    public function rules()
    {
        return [
            'title' => 'required|string|min:2|max:255',
            'description' => 'required|string|min:2',
            'ingredients' => 'required',
            'instructions' => 'required|string|min:2',
        ];
    }
    public function createRecipe($user, $data)
    {
        $recipe = new Recipe();
        $recipe->user_id = $user->id; // link to user
        $recipe->title = $data['title'];
        $recipe->description = $data['description'];
        $recipe->ingredients = $data['ingredients'];
        $recipe->instructions = $data['instructions'];
        return $recipe;
    }
}
