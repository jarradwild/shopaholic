<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

use  App\Order;
use  App\User;

class AdminController extends Controller
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
     * Get All Orders
     */

    public function index() {

        try {

            $orders = Order::orderBy('id', 'desc')->withTrashed()->get();
            return response()->json($orders);

        } catch(\Exception $e) {

            return response()->json(['message' => 'No Orders Found.']);

        }
     }


      /**
      * Delete Order
      */

      public function cancel($id){
          
        try {

            $order = Order::findOrFail($id);
            $order->delete();
            $order->status = 'cancelled';
            $order->save();
            
            return response()->json(['message' => 'Order Cancelled']);

        } catch(\Exception $e) {

            return response()->json(['message' => 'Order Not Found.']);

        }
      }

      /**
      * Update Status Order
      */

      public function updateStatus($id, Request $request){
          
        try {

            $order = Order::withTrashed()->where('id' , $id)->first();
            $order->status = $request->status;

            if($request->status == 'cancelled'){
                $order->delete();
            } elseif ($order->trashed()) {
                $order->restore();
            }

            $order->save();
            
            return response()->json(['order' => $order, 'message' => 'Status Updated.']);

        } catch(\Exception $e) {

            return response()->json(['message' => 'Unable to update status.']);

        }
      }

      /**
      * Add Note to Order
      */

      public function addNote($id, Request $request){

        try {

            $newNote = [$request->all()];
            $order = Order::withTrashed()->where('id' , $id)->first();

            $order->notes = array_merge($newNote, $order->notes);
            $order->save();
            
            return response()->json(['order' => $order, 'message' => 'Note Added Updated.']);

        } catch(\Exception $e) {

            return response()->json(['message' => 'error unable to submit']);

        }
      }
}
