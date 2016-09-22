	var Lanzar = (function() {

		var  _D4 = function () {
			return Math.floor(Math.random()*4)+1;
	
		}

		var _D6 =function () {
			return Math.floor(Math.random()*6)+1;

		}

		var  _D8 = function () {
			return Math.floor(Math.random()*8)+1;
	
		}
		var  _D10 = function () {
			return Math.floor(Math.random()*10)+1;
	
		}
		var  _D12 = function () {
			return Math.floor(Math.random()*12)+1;
	
		}
		var  _D20 = function () {
			return Math.floor(Math.random()*20)+1;
	
		}
		var  _D100 = function () {
			return Math.floor(Math.random()*100)+1;
	
		}

		
	return {
		D4: _D4,
		D6: _D6,
		D8: _D8,
		D10: _D10,
		D12: _D12,
		D20: _D20,
		D100: _D100

	}
})();