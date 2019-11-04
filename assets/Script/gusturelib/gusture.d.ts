namespace Gustures {
	// Type definitions for ./assets/Script/gusturelib/gusture.js
	// Project: [LIBRARY_URL_HERE] 
	// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
	// Definitions: https://github.com/borisyankov/DefinitelyTyped
	// Unistroke.!1
	// type 1 = Array<Point>;
	// // Resample.!ret
	// type Ret = Array<Point>;
	// // IndicativeAngle.!0
	// type 0 = Array<Point>;
	// // RotateBy.!ret
	// type Ret = Array<Point>;
	// // ScaleTo.!ret
	// type Ret = Array<Point>;
	// // RotateBy.!0

	// /**
	//  * 
	//  */
	// declare interface 0 {
	// }

	/**
	 * Point class
	 */
	declare interface Point {
			
		/**
		 * 
		 * @param x 
		 * @param y 
		 * @return  
		 */
		new (x : number, y : number): Point;

		X: number;
		Y: number;
	}


	/**
	 * 
	 */
	declare namespace Point{
			
		/**
		 * 
		 */
		export var X : number;
			
		/**
		 * 
		 */
		export var Y : number;
	}

	/**
	 * Rectangle class
	 */
	export declare interface Rectangle {
			
		/**
		 * 
		 * @param x 
		 * @param y 
		 * @param width 
		 * @param height 
		 * @return  
		 */
		new (x : number, y : number, width : number, height : number): Rectangle;
	}


	/**
	 * 
	 */
	export declare namespace Rectangle{
			
		/**
		 * 
		 */
		export var X : number;
			
		/**
		 * 
		 */
		export var Y : number;
			
		/**
		 * 
		 */
		export var Width : number;
			
		/**
		 * 
		 */
		export var Height : number;
	}

	/**
	 * Unistroke class: a unistroke template
	 */
	export declare interface Unistroke {
			
		/**
		 * 
		 * @param name 
		 * @param points 
		 * @return  
		 */
		new (name : string, points : 1): Unistroke;
	}


	/**
	 * 
	 */
	export declare namespace Unistroke{
			
		/**
		 * 
		 */
		export var Name : string;
			
		/**
		 * 
		 */
		export var Points : Array<Point>;
			
		/**
		 * 
		 */
		export var Vector : Array<number>;
	}

	/**
	 * Result class
	 */
	export declare interface Result {
			
		/**
		 * 
		 * @param name 
		 * @param score 
		 * @param ms 
		 * @return  
		 */
		new (name : string, score : number, ms : number): Result;

		Name: string;
		Score: number;
		Time: number;
	}


	/**
	 * DollarRecognizer constants
	 */
	export declare var NumUnistrokes : number;

	/**
	 * 
	 */
	export declare var NumPoints : number;

	/**
	 * 
	 */
	export declare var SquareSize : number;

	/**
	 * 
	 */
	export declare var Origin : Point;

	/**
	 * 
	 */
	export declare var Diagonal : number;

	/**
	 * 
	 */
	export declare var HalfDiagonal : number;

	/**
	 * 
	 */
	export declare var AngleRange : number;

	/**
	 * 
	 */
	export declare var AnglePrecision : number;

	/**
	 * 
	 */
	export declare var Phi : number;

	/**
	 * DollarRecognizer class
	 */
	export declare class DollarRecognizer {
			
		/**
		 * 
		 * @return  
		 */
		new (): DollarRecognizer;
	}

	/**
	 * add gesture points
	 * @param name 
	 * @param points 
	 */
	export declare function AddGesture(name: string, points: Point[]): number;

	/**
	 * delete all user gestures
	 */
	export declare function DeleteUserGestures();


	export declare function Recognize(points: Point[], useProtractor: number): Result;

	/**
	 * Private helper functions from here on down
	 */
	export declare interface Resample {
			
		/**
		 * 
		 * @param points 
		 * @param n 
		 * @return  
		 */
		new (points : Array<Point>, n : number): Ret;
	}


	/**
	 * 
	 */
	export declare interface IndicativeAngle {
			
		/**
		 * 
		 * @param points 
		 * @return  
		 */
		new (points : 0): number;
	}


	/**
	 * 
	 */
	declare interface RotateBy {
			
		/**
		 * 
		 * @param points 
		 * @param radians 
		 * @return  
		 */
		new (points : 0, radians : number): Ret;
	}


	/**
	 * 
	 */
	declare interface ScaleTo {
			
		/**
		 * 
		 * @param points 
		 * @param size 
		 * @return  
		 */
		new (points : Array<Point>, size : number): Ret;
	}


	/**
	 * 
	 */
	declare interface TranslateTo {
			
		/**
		 * 
		 * @param points 
		 * @param pt 
		 * @return  
		 */
		new (points : Array<Point>, pt : Point): Array<Point>;
	}


	/**
	 * 
	 */
	declare interface Vectorize {
			
		/**
		 * 
		 * @param points 
		 * @return  
		 */
		new (points : Array<Point>): Array<number>;
	}


	/**
	 * 
	 */
	declare interface OptimalCosineDistance {
			
		/**
		 * 
		 * @param v1 
		 * @param v2 
		 * @return  
		 */
		new (v1 : any, v2 : Array<number>): number;
	}


	/**
	 * 
	 */
	declare interface DistanceAtBestAngle {
			
		/**
		 * 
		 * @param points 
		 * @param T 
		 * @param a 
		 * @param b 
		 * @param threshold 
		 * @return  
		 */
		new (points : Array<Point>, T : any, a : number, b : number, threshold : number): number;
	}


	/**
	 * 
	 */
	declare interface DistanceAtAngle {
			
		/**
		 * 
		 * @param points 
		 * @param T 
		 * @param radians 
		 * @return  
		 */
		new (points : Array<Point>, T : Unistroke, radians : number): number;
	}


	/**
	 * 
	 */
	declare interface Centroid {
			
		/**
		 * 
		 * @param points 
		 * @return  
		 */
		new (points : Array<Point>): Point;
	}


	/**
	 * 
	 */
	declare interface BoundingBox {
			
		/**
		 * 
		 * @param points 
		 * @return  
		 */
		new (points : Array<Point>): Rectangle;
	}


	/**
	 * 
	 */
	declare interface PathDistance {
			
		/**
		 * 
		 * @param pts1 
		 * @param pts2 
		 * @return  
		 */
		new (pts1 : Array<Point>, pts2 : any): number;
	}


	/**
	 * 
	 */
	declare interface PathLength {
			
		/**
		 * 
		 * @param points 
		 * @return  
		 */
		new (points : Array<Point>): number;
	}


	/**
	 * 
	 */
	declare interface Distance {
			
		/**
		 * 
		 * @param p1 
		 * @param p2 
		 * @return  
		 */
		new (p1 : Point, p2 : Point): number;
	}


	/**
	 * 
	 */
	declare interface Deg2Rad {
			
		/**
		 * 
		 * @param d 
		 * @return  
		 */
		new (d : number): number;
	}


}
export default Gus;