async function getJson(url) {
	
	const response = await fetch(url);
	const dados = await response.json();
	return dados;
	
}

async function converter(moeda,moedaConverter,valor) {
	
	const moedaApi = getJson(`https://api.exchangerate-api.com/v4/latest/${moeda}`);
	let res = 0;
	
	await moedaApi.then(obj => {
		
		res = obj.rates[moedaConverter] * valor;
		
	});
	
	return res;
	
}

const seletor = tag => document.querySelector(tag);

function trocarBandeira(select,img) {
	
	const bandeiras = {
		
		brl: 'https://static.preparaenem.com/2021/11/bandeira-do-brasil.jpg' ,
		usd: 'https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/05/bandeira-estados-unidos.jpg' ,
		eur: 'https://s5.static.brasilescola.uol.com.br/be/2022/03/bandeira-uniao-europeia.jpg' ,
		chf: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_Switzerland_%28Pantone%29.svg/800px-Flag_of_Switzerland_%28Pantone%29.svg.png'	 ,
		gbp: 'https://img.freepik.com/vetores-premium/bandeira-da-gra-bretanha-bandeira-da-inglaterra-vector-icon-bandeira-do-reino-unido-da-gra-bretanha-10-eps_800531-104.jpg' ,
		
	}
	
	const bandeira = (select.value).toLowerCase();
	
	img.src = bandeiras[bandeira];
	
}

function init() {
	
	
	const btnConverter = seletor('button');
	
	const inputConverter = seletor('.input-converter');
	const inputConvertido = seletor('.input-convertido');
	
	const imgConverter = seletor('.img-converter');
	const imgConvertido = seletor('.img-convertido');
	
	const moeda = seletor('.moeda');
	const moedaConvertida = seletor('.moeda-convertida');
	
	moeda.addEventListener('change',function(){
		trocarBandeira(moeda,imgConverter);
		inputConvertido.value = '';
	});
	
	moedaConvertida.addEventListener('change',function(){
		trocarBandeira(moedaConvertida,imgConvertido);
		inputConvertido.value = '';
	});
	
	btnConverter.addEventListener('click',function(){
		
		let valorConvertido = converter(moeda.value,moedaConvertida.value,Number(inputConverter.value));
		
		valorConvertido.then(valor => {
			inputConvertido.value = valor.toFixed(2);
		});
		
	});
	
}

document.addEventListener('DOMContentLoaded',init);
