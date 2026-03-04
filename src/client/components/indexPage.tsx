import FoodManager from "../../foodManager.js";

export default function IndexPage(props: { foodCode?: string }) {
	return (
		<>
			{"<!DOCTYPE html>"}
			<html>
				<head>
					<link rel="stylesheet" href="/index.css" />
					<script type="module" src="/index.js" defer></script>
				</head>
				<body>
					<h1>orca food!</h1>
					<a href="https://gart.sh/l/kofi" target="_blank">
						<h3>help cover food costs! (click me)</h3>
					</a>

					<div class="food-search">
						<input
							id="food-input"
							name="query"
							type="text"
							placeholder="put your two character food code here!"
							autocomplete="off"
							hx-get="/foodsearch"
							hx-trigger="keyup changed delay:200ms"
							hx-target="#food"
							maxlength="2"
						></input>
					</div>

					<div id="food">
						{props.foodCode &&
							FoodManager.pages[props.foodCode] &&
							FoodManager.pages[props.foodCode].render()}
					</div>

					<div>
						<h1>CONTAINER RETURN</h1>
						<p>
							please contact me to return your containers! (they arent super fancy or anything but i only have
							so many and i like them a lot {">.<"}) thank you!
						</p>
					</div>
				</body>
			</html>
		</>
	);
}
