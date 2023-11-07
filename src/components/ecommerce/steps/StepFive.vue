<template>
	<div class="review">
		<h2>Order Summary</h2>
		<div class="row">
			<p>Subtotal</p>
			<p>$8.99</p>
		</div>
		<div class="row">
			<p>Taxes</p>
			<p>$2.99</p>
		</div>
		<div class="row break">
			<p>Shipping</p>
			<p>$3.99</p>
		</div>
		<div class="row total">
			<p>Total</p>
			<p>$15.97</p>
		</div>
	</div>
</template>

<style lang="scss">
	@import "@/assets/css/main.scss";
	.review {
		h2 {
			text-align: center;
			margin-bottom: 16px;
		}
		.row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-left: 16px;
			padding-right: 16px;
			margin-bottom: 12px;
			p {
				@include fontz(1.2, 400, t1)
			}
		}
		.break {
			padding-bottom: 16px;
			border-bottom: 1px solid getColor(d1);
		}
		.total {
			padding: 16px;
			p {
				@include fontz(1.4, 500, t1)
			}
		}
	}
</style>