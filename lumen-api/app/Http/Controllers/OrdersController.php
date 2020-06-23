<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

use  App\Order;
// use  App\User;

class OrdersController extends Controller
{
     /**
     * Instantiate a new UserController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /** 
     * Get Users Order
     */
    public function index() {

        try {

            $orders = Order::where('user_id', JWTAuth::user()->id)->orderBy('id', 'desc')->withTrashed()->get();
            return response()->json($orders);

        } catch(\Exception $e) {

            return response()->json(['message' => 'No Orders Found.']);

        }
     }

    /**
     * Add an Order.
     *
     * @return Response
     */
    public function create(Request $request)
    {
        // //validate incoming request 
        $this->validate($request, [
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        try {
           
            $order = new Order;
            $order->title = $request->input('title');
            $order->description = $request->input('description');
            $order->status = $request->input('status');
            $order->notes = $request->input('notes');
            $order->user_id = Auth::id();

            $order->save();

            //return successful response
            return response()->json(['order' => $order, 'message' => 'Order Created'], 201);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => 'Order Creation Failed!'], 409);
        }

    }

     /**
      * Get Order
      */

      public function show($id){

        try {

            $order = Order::findOrFail($id);
            return response()->json($order);

        } catch(\Exception $e) {

            return response()->json(['message' => 'Order Not Found.']);

        }
      }

}
