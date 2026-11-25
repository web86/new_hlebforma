/* Catalogue: shared product data, responsive filtering and shape-first browsing. */
(function(){
  'use strict';
  const pages=[
  {
    "code": "all",
    "alias": "",
    "label": "Все товары",
    "h1": "Корзинки для расстойки теста",
    "title": "Корзинки для расстойки теста из ротанга — каталог HLEB-FORMA",
    "description": "Подберите корзинки для расстойки по форме, весу теста и размеру. В каталоге также представлены принадлежности для хлебопечения.",
    "body": "Выберите подходящую форму, затем сравните размеры и рекомендуемую вместимость. Вес теста указан до выпечки.",
    "legacyPath": "/katalog"
  },
  {
    "code": "round",
    "alias": "kruglye-formy",
    "label": "Круглые",
    "h1": "Круглые корзинки для расстойки теста",
    "title": "Круглые корзинки для расстойки хлеба — размеры и цены | HLEB-FORMA",
    "description": "Круглые корзинки из ротанга для расстойки хлеба. Сравните диаметр, глубину, вес тестовой заготовки и цены.",
    "body": "Круглая корзинка помогает поддерживать форму классической буханки. При выборе учитывайте вес теста до выпечки и размеры корзинки.",
    "legacyPath": "/katalog/kruglye-formy"
  },
  {
    "code": "oval",
    "alias": "ovalnye-usechennye-knizu",
    "label": "Овальные",
    "h1": "Овальные корзинки для расстойки теста",
    "title": "Овальные корзинки для расстойки хлеба из ротанга | HLEB-FORMA",
    "description": "Овальные корзинки, усечённые книзу, для батонов и продолговатого хлеба. Подбор модели по весу теста и размерам.",
    "body": "Овальные модели подходят для продолговатой заготовки. Сравните длину, ширину и вместимость разных корзинок под ваш рецепт.",
    "legacyPath": "/katalog/ovalnye-usechennye-knizu"
  },
  {
    "code": "baguette",
    "alias": "bagetnye",
    "label": "Багетные",
    "h1": "Багетные корзинки для расстойки хлеба",
    "title": "Багетные корзинки для расстойки теста — каталог | HLEB-FORMA",
    "description": "Продолговатые корзинки для расстойки багетов. Выберите форму по длине заготовки и указанному весу теста.",
    "body": "Багетные корзинки поддерживают длинную заготовку во время расстойки. Перед покупкой проверьте длину и ширину формы.",
    "legacyPath": "/katalog/bagetnye"
  },
  {
    "code": "ring",
    "alias": "kruglye-formy-bez-serediny",
    "label": "С отверстием",
    "h1": "Круглые корзинки с отверстием",
    "title": "Круглые формы без середины для расстойки хлеба | HLEB-FORMA",
    "description": "Круглые расстоечные корзинки с отверстием в центре для хлебных колец и калачей. Подбор формы для кольцевой заготовки.",
    "body": "Формы с отверстием помогают поддерживать кольцевую заготовку. Учитывайте наружный размер, размер отверстия и вес теста.",
    "legacyPath": "/katalog/kruglye-formy-bez-serediny"
  },
  {
    "code": "rectangle",
    "alias": "prjamougolnye",
    "label": "Прямоугольные",
    "h1": "Прямоугольные корзинки для расстойки теста",
    "title": "Прямоугольные корзинки для расстойки хлеба | HLEB-FORMA",
    "description": "Прямоугольные корзинки из ротанга для расстойки хлеба. Сравните габариты и вместимость заготовки.",
    "body": "Прямоугольная корзинка поддерживает заданную геометрию теста. Для расстойки и выпечки используются разные формы: ротанговую корзинку не ставят в духовку.",
    "legacyPath": "/katalog/prjamougolnye"
  },
  {
    "code": "triangle-square",
    "alias": "treugolnye-kvadratnye",
    "label": "Треугольные и квадратные",
    "h1": "Треугольные и квадратные корзинки для расстойки",
    "title": "Треугольные и квадратные корзины для расстойки теста | HLEB-FORMA",
    "description": "Геометрические корзинки для расстойки треугольного и квадратного хлеба. Выбор формы, размеров и веса теста.",
    "body": "Выберите треугольную или квадратную модель в зависимости от желаемой формы хлеба. Сравните вместимость и глубину корзинок.",
    "legacyPath": "/katalog/treugolnye-kvadratnye"
  },
  {
    "code": "figure",
    "alias": "raznye",
    "label": "Фигурные",
    "h1": "Фигурные корзинки для расстойки хлеба",
    "title": "Фигурные корзинки для расстойки — сердце, ромб, лодочка | HLEB-FORMA",
    "description": "Корзинки для хлеба необычной формы: сердечки, ромбы и лодочки. Подберите модель по форме и вместимости теста.",
    "body": "Фигурные корзинки помогают придать заготовке необычный контур. Выберите сердечко, ромб или лодочку и проверьте размеры конкретной модели.",
    "legacyPath": "/katalog/raznye"
  },
  {
    "code": "baking",
    "alias": "formi-dlya-vipechki",
    "label": "Для выпечки",
    "h1": "Формы для выпечки хлеба",
    "title": "Формы для выпечки хлеба — каталог | HLEB-FORMA",
    "description": "Формы для выпечки хлеба в духовке. Сравните назначение и размеры изделий перед выбором.",
    "body": "В этом разделе представлены формы, предназначенные для выпечки, а не для расстойки. Перед использованием проверьте материал и температурные ограничения изделия.",
    "legacyPath": "/katalog/formi-dlya-vipechki"
  },
  {
    "code": "cleaning",
    "alias": "sredstva-uhoda-i-chistki-korzin-iz-rotanga",
    "label": "Уход за корзинками",
    "h1": "Инструменты для очистки корзинок из ротанга",
    "title": "Инструменты для ухода и чистки расстоечных корзин | HLEB-FORMA",
    "description": "Принадлежности для ухода за корзинками из ротанга и удаления остатков муки после расстойки.",
    "body": "Для ухода за ротангом важно использовать подходящие средства и полностью просушивать корзинку перед хранением. Выбирайте инструмент с учётом рекомендаций производителя.",
    "legacyPath": "/katalog/sredstva-uhoda-i-chistki-korzin-iz-rotanga"
  },
  {
    "code": "tools",
    "alias": "baking-tools",
    "label": "Аксессуары",
    "h1": "Инструменты для работы с тестом и хлебом",
    "title": "Инструменты для работы с тестом и хлебом | HLEB-FORMA",
    "description": "Принадлежности для хлебопечения: инструменты для надрезов и расстойки хлебных заготовок.",
    "body": "Здесь собраны принадлежности для разных этапов хлебопечения. Выберите инструмент по его назначению и размерам.",
    "legacyPath": "/katalog/baking-tools"
  }
];
  const icons={"round":"<svg viewBox=\"0 0 220 152\" aria-hidden=\"true\" focusable=\"false\"><g fill=\"none\" stroke=\"#936542\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M110 18 C147 17 177 42 178 75 C180 109 151 132 111 133 C73 135 43 111 42 76 C40 43 72 20 110 18Z\" stroke-width=\"5\"/><path d=\"M110 18 C147 17 177 42 178 75 C180 109 151 132 111 133 C73 135 43 111 42 76 C40 43 72 20 110 18Z\" stroke-width=\"2.7\" transform=\"translate(110 76) scale(.84) translate(-110 -76)\"/><path d=\"M110 18 C147 17 177 42 178 75 C180 109 151 132 111 133 C73 135 43 111 42 76 C40 43 72 20 110 18Z\" stroke-width=\"2.2\" transform=\"translate(110 76) scale(.68) translate(-110 -76)\"/><path d=\"M110 18 C147 17 177 42 178 75 C180 109 151 132 111 133 C73 135 43 111 42 76 C40 43 72 20 110 18Z\" stroke-width=\"1.8\" transform=\"translate(110 76) scale(.52) translate(-110 -76)\"/></g></svg>","oval":"<svg viewBox=\"0 0 220 152\" aria-hidden=\"true\" focusable=\"false\"><g fill=\"none\" stroke=\"#936542\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M112 30 C167 28 199 46 199 77 C200 106 162 125 110 124 C62 124 21 105 21 77 C20 46 59 30 112 30Z\" stroke-width=\"5\"/><path d=\"M112 30 C167 28 199 46 199 77 C200 106 162 125 110 124 C62 124 21 105 21 77 C20 46 59 30 112 30Z\" stroke-width=\"2.7\" transform=\"translate(110 76) scale(.84) translate(-110 -76)\"/><path d=\"M112 30 C167 28 199 46 199 77 C200 106 162 125 110 124 C62 124 21 105 21 77 C20 46 59 30 112 30Z\" stroke-width=\"2.2\" transform=\"translate(110 76) scale(.68) translate(-110 -76)\"/><path d=\"M112 30 C167 28 199 46 199 77 C200 106 162 125 110 124 C62 124 21 105 21 77 C20 46 59 30 112 30Z\" stroke-width=\"1.8\" transform=\"translate(110 76) scale(.52) translate(-110 -76)\"/></g></svg>","baguette":"<svg viewBox=\"0 0 220 152\" aria-hidden=\"true\" focusable=\"false\"><g fill=\"none\" stroke=\"#936542\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16 73 C18 57 38 52 78 51 L161 51 C186 51 206 60 205 75 C203 91 181 98 150 99 L68 98 C34 98 15 89 16 73Z\" stroke-width=\"5\"/><path d=\"M16 73 C18 57 38 52 78 51 L161 51 C186 51 206 60 205 75 C203 91 181 98 150 99 L68 98 C34 98 15 89 16 73Z\" stroke-width=\"2.7\" transform=\"translate(110 76) scale(.84) translate(-110 -76)\"/><path d=\"M16 73 C18 57 38 52 78 51 L161 51 C186 51 206 60 205 75 C203 91 181 98 150 99 L68 98 C34 98 15 89 16 73Z\" stroke-width=\"2.2\" transform=\"translate(110 76) scale(.68) translate(-110 -76)\"/><path d=\"M16 73 C18 57 38 52 78 51 L161 51 C186 51 206 60 205 75 C203 91 181 98 150 99 L68 98 C34 98 15 89 16 73Z\" stroke-width=\"1.8\" transform=\"translate(110 76) scale(.52) translate(-110 -76)\"/></g></svg>","ring":"<svg viewBox=\"0 0 220 152\" aria-hidden=\"true\" focusable=\"false\"><g fill=\"none\" stroke=\"#936542\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M110 18 C151 18 180 42 180 76 C180 110 150 133 110 133 C69 133 40 110 40 76 C40 42 70 18 110 18Z M110 54 C94 54 84 63 84 76 C84 89 95 99 110 99 C126 99 136 89 136 76 C136 63 125 54 110 54Z\" stroke-width=\"5\"/><path d=\"M110 18 C151 18 180 42 180 76 C180 110 150 133 110 133 C69 133 40 110 40 76 C40 42 70 18 110 18Z M110 54 C94 54 84 63 84 76 C84 89 95 99 110 99 C126 99 136 89 136 76 C136 63 125 54 110 54Z\" stroke-width=\"2.7\" transform=\"translate(110 76) scale(.84) translate(-110 -76)\"/><path d=\"M110 18 C151 18 180 42 180 76 C180 110 150 133 110 133 C69 133 40 110 40 76 C40 42 70 18 110 18Z M110 54 C94 54 84 63 84 76 C84 89 95 99 110 99 C126 99 136 89 136 76 C136 63 125 54 110 54Z\" stroke-width=\"2.2\" transform=\"translate(110 76) scale(.68) translate(-110 -76)\"/><path d=\"M110 18 C151 18 180 42 180 76 C180 110 150 133 110 133 C69 133 40 110 40 76 C40 42 70 18 110 18Z M110 54 C94 54 84 63 84 76 C84 89 95 99 110 99 C126 99 136 89 136 76 C136 63 125 54 110 54Z\" stroke-width=\"1.8\" transform=\"translate(110 76) scale(.52) translate(-110 -76)\"/></g></svg>","rectangle":"<svg viewBox=\"0 0 220 152\" aria-hidden=\"true\" focusable=\"false\"><g fill=\"none\" stroke=\"#936542\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M40 30 Q26 32 25 48 L25 106 Q26 121 44 123 L179 123 Q196 121 196 105 L196 48 Q195 30 177 30Z\" stroke-width=\"5\"/><path d=\"M40 30 Q26 32 25 48 L25 106 Q26 121 44 123 L179 123 Q196 121 196 105 L196 48 Q195 30 177 30Z\" stroke-width=\"2.7\" transform=\"translate(110 76) scale(.84) translate(-110 -76)\"/><path d=\"M40 30 Q26 32 25 48 L25 106 Q26 121 44 123 L179 123 Q196 121 196 105 L196 48 Q195 30 177 30Z\" stroke-width=\"2.2\" transform=\"translate(110 76) scale(.68) translate(-110 -76)\"/><path d=\"M40 30 Q26 32 25 48 L25 106 Q26 121 44 123 L179 123 Q196 121 196 105 L196 48 Q195 30 177 30Z\" stroke-width=\"1.8\" transform=\"translate(110 76) scale(.52) translate(-110 -76)\"/></g></svg>","square":"<svg viewBox=\"0 0 220 152\" aria-hidden=\"true\" focusable=\"false\"><g fill=\"none\" stroke=\"#936542\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M67 19 Q51 19 49 37 L49 115 Q50 133 67 133 L154 133 Q171 132 171 115 L171 38 Q170 20 153 19Z\" stroke-width=\"5\"/><path d=\"M67 19 Q51 19 49 37 L49 115 Q50 133 67 133 L154 133 Q171 132 171 115 L171 38 Q170 20 153 19Z\" stroke-width=\"2.7\" transform=\"translate(110 76) scale(.84) translate(-110 -76)\"/><path d=\"M67 19 Q51 19 49 37 L49 115 Q50 133 67 133 L154 133 Q171 132 171 115 L171 38 Q170 20 153 19Z\" stroke-width=\"2.2\" transform=\"translate(110 76) scale(.68) translate(-110 -76)\"/><path d=\"M67 19 Q51 19 49 37 L49 115 Q50 133 67 133 L154 133 Q171 132 171 115 L171 38 Q170 20 153 19Z\" stroke-width=\"1.8\" transform=\"translate(110 76) scale(.52) translate(-110 -76)\"/></g></svg>","triangle":"<svg viewBox=\"0 0 220 152\" aria-hidden=\"true\" focusable=\"false\"><g fill=\"none\" stroke=\"#936542\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M96 23 Q109 7 124 23 L180 106 Q190 124 170 130 L50 130 Q30 124 40 106Z\" stroke-width=\"5\"/><path d=\"M96 23 Q109 7 124 23 L180 106 Q190 124 170 130 L50 130 Q30 124 40 106Z\" stroke-width=\"2.7\" transform=\"translate(110 76) scale(.84) translate(-110 -76)\"/><path d=\"M96 23 Q109 7 124 23 L180 106 Q190 124 170 130 L50 130 Q30 124 40 106Z\" stroke-width=\"2.2\" transform=\"translate(110 76) scale(.68) translate(-110 -76)\"/><path d=\"M96 23 Q109 7 124 23 L180 106 Q190 124 170 130 L50 130 Q30 124 40 106Z\" stroke-width=\"1.8\" transform=\"translate(110 76) scale(.52) translate(-110 -76)\"/></g></svg>","heart":"<svg viewBox=\"0 0 220 152\" aria-hidden=\"true\" focusable=\"false\"><g fill=\"none\" stroke=\"#936542\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M110 40 C89 10 45 15 37 45 C26 83 79 110 110 134 C142 110 194 83 183 45 C175 15 132 10 110 40Z\" stroke-width=\"5\"/><path d=\"M110 40 C89 10 45 15 37 45 C26 83 79 110 110 134 C142 110 194 83 183 45 C175 15 132 10 110 40Z\" stroke-width=\"2.7\" transform=\"translate(110 76) scale(.84) translate(-110 -76)\"/><path d=\"M110 40 C89 10 45 15 37 45 C26 83 79 110 110 134 C142 110 194 83 183 45 C175 15 132 10 110 40Z\" stroke-width=\"2.2\" transform=\"translate(110 76) scale(.68) translate(-110 -76)\"/><path d=\"M110 40 C89 10 45 15 37 45 C26 83 79 110 110 134 C142 110 194 83 183 45 C175 15 132 10 110 40Z\" stroke-width=\"1.8\" transform=\"translate(110 76) scale(.52) translate(-110 -76)\"/></g></svg>","diamond":"<svg viewBox=\"0 0 220 152\" aria-hidden=\"true\" focusable=\"false\"><g fill=\"none\" stroke=\"#936542\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M102 17 Q110 10 120 17 L184 65 Q197 76 183 88 L121 135 Q111 141 101 134 L37 88 Q23 76 37 65Z\" stroke-width=\"5\"/><path d=\"M102 17 Q110 10 120 17 L184 65 Q197 76 183 88 L121 135 Q111 141 101 134 L37 88 Q23 76 37 65Z\" stroke-width=\"2.7\" transform=\"translate(110 76) scale(.84) translate(-110 -76)\"/><path d=\"M102 17 Q110 10 120 17 L184 65 Q197 76 183 88 L121 135 Q111 141 101 134 L37 88 Q23 76 37 65Z\" stroke-width=\"2.2\" transform=\"translate(110 76) scale(.68) translate(-110 -76)\"/><path d=\"M102 17 Q110 10 120 17 L184 65 Q197 76 183 88 L121 135 Q111 141 101 134 L37 88 Q23 76 37 65Z\" stroke-width=\"1.8\" transform=\"translate(110 76) scale(.52) translate(-110 -76)\"/></g></svg>","triangle-square":"<svg viewBox=\"0 0 220 152\" aria-hidden=\"true\" focusable=\"false\"><g fill=\"none\" stroke=\"#936542\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M96 23 Q109 7 124 23 L180 106 Q190 124 170 130 L50 130 Q30 124 40 106Z\" stroke-width=\"5\"/><path d=\"M96 23 Q109 7 124 23 L180 106 Q190 124 170 130 L50 130 Q30 124 40 106Z\" stroke-width=\"2.7\" transform=\"translate(110 76) scale(.84) translate(-110 -76)\"/><path d=\"M96 23 Q109 7 124 23 L180 106 Q190 124 170 130 L50 130 Q30 124 40 106Z\" stroke-width=\"2.2\" transform=\"translate(110 76) scale(.68) translate(-110 -76)\"/><path d=\"M96 23 Q109 7 124 23 L180 106 Q190 124 170 130 L50 130 Q30 124 40 106Z\" stroke-width=\"1.8\" transform=\"translate(110 76) scale(.52) translate(-110 -76)\"/></g></svg>","figure":"<svg viewBox=\"0 0 220 152\" aria-hidden=\"true\" focusable=\"false\"><g fill=\"none\" stroke=\"#936542\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M110 40 C89 10 45 15 37 45 C26 83 79 110 110 134 C142 110 194 83 183 45 C175 15 132 10 110 40Z\" stroke-width=\"5\"/><path d=\"M110 40 C89 10 45 15 37 45 C26 83 79 110 110 134 C142 110 194 83 183 45 C175 15 132 10 110 40Z\" stroke-width=\"2.7\" transform=\"translate(110 76) scale(.84) translate(-110 -76)\"/><path d=\"M110 40 C89 10 45 15 37 45 C26 83 79 110 110 134 C142 110 194 83 183 45 C175 15 132 10 110 40Z\" stroke-width=\"2.2\" transform=\"translate(110 76) scale(.68) translate(-110 -76)\"/><path d=\"M110 40 C89 10 45 15 37 45 C26 83 79 110 110 134 C142 110 194 83 183 45 C175 15 132 10 110 40Z\" stroke-width=\"1.8\" transform=\"translate(110 76) scale(.52) translate(-110 -76)\"/></g></svg>","all":"<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"#936542\" stroke-width=\"1.8\" aria-hidden=\"true\"><rect x=\"6\" y=\"6\" width=\"15\" height=\"15\" rx=\"5\"/><rect x=\"27\" y=\"6\" width=\"15\" height=\"15\" rx=\"5\"/><rect x=\"6\" y=\"27\" width=\"15\" height=\"15\" rx=\"5\"/><rect x=\"27\" y=\"27\" width=\"15\" height=\"15\" rx=\"5\"/></svg>","baking":"<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"#936542\" stroke-width=\"1.8\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 15h38l-5 21H10zM5 15l4-5h30l4 5M14 20l2 10m8-10v10m10-10-2 10\"/></svg>","cleaning":"<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"#936542\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M27 24 39 7q2-3-1-5t-5 1L21 20M11 20l17 12-7 10L4 30zM7 33l-3 5m7-2-3 5m7-2-3 5m7-2-3 5\"/></svg>","tools":"<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"#936542\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 34 33 13l5 5-21 21H9zM29 17l5 5M13 10h9v10M10 13h7M27 32h13v8H27zM30 35h7\"/></svg>"};
  const shapeLabels=Object.fromEntries([...pages.map(x=>[x.code,x.label]),['triangle','Треугольные'],['square','Квадратные'],['heart','Сердечки'],['diamond','Ромбы'],['boat','Лодочки']]);
  const subgroups={'triangle-square':['triangle','square'],figure:['heart','diamond','boat']};
  const shapeOptions=[['all','Все формы'],...pages.filter(x=>x.code!=='all').map(x=>[x.code,x.label]),...['triangle','square','heart','diamond','boat'].map(x=>[x,shapeLabels[x]])];
  const pageHref=page=>'../katalog/'+(page.alias?page.alias+'/':'');
  const weights=[['all','Любой вес'],['small','До 400 г'],['mid','401–600 г'],['large','601–850 г'],['xl','Более 850 г']];
  const prices=[['all','Любая цена'],['low','До 700 ₽'],['mid','701–900 ₽'],['high','От 901 ₽']];
  const sorts=[['featured','Рекомендуемые'],['price-up','Сначала дешевле'],['price-down','Сначала дороже'],['weight-up','Вес теста: по возрастанию'],['weight-down','Вес теста: по убыванию'],['discount','По размеру скидки']];
  const featured=['bn001','bn09','bn11','bn24','bn26','bn27','bn28','bn29','bn30'];
  const figures=['heart','diamond','boat'];
  const breadShapes={round:'round',oval:'oval',baguette:'baguette',triangle:'triangle',heart:'heart',diamond:'diamond',boat:'oval',square:'square',rectangle:'rectangle',ring:'ring'};
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt=n=>Number(n).toLocaleString('ru-RU')+' ₽';
  const sale=p=>Number(p.oldPrice)>Number(p.price);
  const discount=p=>sale(p)?Math.round(100*(p.oldPrice-p.price)/p.oldPrice):0;
  const promotionMeta=Object.freeze({h1:'Акции',title:'Акции и скидки на корзинки для расстойки хлеба — HLEB-FORMA',description:'Скидки, распродажа, выгодные подборки корзинок и акция за отзыв с фотографией. Сравните предложения Hleb-Forma.'});
  function promotionStats(products){const items=products.filter(sale);return {items,count:items.length,maxSaving:items.reduce((n,p)=>Math.max(n,Number(p.oldPrice)-Number(p.price)),0)};}
  // Explicit preview placement, not inventory status. Prices come from the shared catalogue.
  const clearancePreviewIds=new Set(['bn001','bn09']);
  const bundleDefinitions=Object.freeze([
    {id:'first-bread',name:'Мой первый хлеб',description:'Круглая и овальная формы для начала.',ids:['bn01','bn10']},
    {id:'every-day',name:'Хлеб на каждый день',description:'Два формата для любимых рецептов.',ids:['bn001','bn11']},
    {id:'baguette-set',name:'Для любителей багетов',description:'Длинная корзинка и холст для расстойки.',ids:['bn06','canvas']},
    {id:'creative-bread',name:'Хлеб с характером',description:'Треугольная форма и сердце для необычной выпечки.',ids:['bn09','bn28']}
  ]);
  function promotionSections(products){
    const stats=promotionStats(products),clearance=stats.items.filter(p=>clearancePreviewIds.has(p.id)),discounts=stats.items.filter(p=>!clearancePreviewIds.has(p.id));
    return {...stats,discounts,clearance};
  }
  function promotionBundles(products){
    const byId=new Map(products.map(p=>[p.id,p]));
    return bundleDefinitions.map(b=>{
      const items=b.ids.map(id=>byId.get(id));
      if(items.some(p=>!p||!Number.isFinite(Number(p.price))||Number(p.price)<=0))return null;
      const price=items.reduce((n,p)=>n+Number(p.price),0);
      const ordinary=items.reduce((n,p)=>n+Math.max(Number(p.oldPrice)||0,Number(p.price)),0);
      return {...b,items,price,ordinary,saving:ordinary-price};
    }).filter(b=>b&&b.saving>0);
  }
  function bundleCart(cart,products,id){
    const bundle=promotionBundles(products).find(b=>b.id===id);
    if(!bundle)return null;
    const next={...cart};
    for(const p of bundle.items){const n=Number(next[p.id]||0);if(!Number.isInteger(n)||n<0||n>=99)return null;next[p.id]=n+1;}
    return next;
  }
  const normalize=s=>String(s??'').toLocaleLowerCase('ru').replace(/ё/g,'е').replace(/×/g,'x').trim();
  const compact=s=>normalize(s).replace(/[^\p{L}\p{N}]/gu,'');
  const defaults=()=>({shape:'all',weight:'all',price:'all',sale:false,q:'',sort:'featured'});
  function shapeMatch(p,shape){return shape==='all'||(shape==='tools'?['tool','cloth'].includes(p.shape):shape==='figure'?figures.includes(p.shape):shape==='triangle-square'?['triangle','square'].includes(p.shape):p.shape===shape);}
  function matches(p,f){
    if(!shapeMatch(p,f.shape))return false;
    if(f.sale&&!sale(p))return false;
    if(f.weight!=='all'){
      const w=Number(p.weight);if(!(w>0))return false;
      if(f.weight==='small'&&w>400||f.weight==='mid'&&(w<=400||w>600)||f.weight==='large'&&(w<=600||w>850)||f.weight==='xl'&&w<=850)return false;
    }
    if(f.price==='low'&&p.price>700||f.price==='mid'&&(p.price<=700||p.price>900)||f.price==='high'&&p.price<=900)return false;
    const q=normalize(f.q);if(!q)return true;
    const sku=compact(q).replace(/^бн/,'bn');
    if(/^bn\d+$/.test(sku))return compact(p.sku)===sku;
    const hay=normalize([p.title,p.sku,p.kind,p.size,p.weightText,shapeLabels[p.shape]||''].join(' '));
    return q.split(/\s+/).every(t=>hay.includes(t)||compact(hay).includes(compact(t)));
  }
  function selectProducts(products,f,scope='all'){
    const found=products.filter(p=>shapeMatch(p,scope)&&matches(p,f));
    const rank=p=>{const i=featured.indexOf(p.id);return i<0?featured.length+products.indexOf(p):i;};
    const order={
      featured:(a,b)=>rank(a)-rank(b),
      'price-up':(a,b)=>a.price-b.price,'price-down':(a,b)=>b.price-a.price,
      'weight-up':(a,b)=>(a.weight||Infinity)-(b.weight||Infinity),
      'weight-down':(a,b)=>(b.weight||-1)-(a.weight||-1),
      discount:(a,b)=>discount(b)-discount(a)
    };
    return found.sort((a,b)=>(order[f.sort]||order.featured)(a,b)||rank(a)-rank(b));
  }
  function plural(n){const a=n%10,b=n%100;return b>=11&&b<=14?'товаров':a===1?'товар':a>=2&&a<=4?'товара':'товаров';}
  function options(items){return items.map(([v,l])=>`<option value="${escape(v)}">${escape(l)}</option>`).join('');}
  function create({products,app,pageCode='all',initialShape='all'}){
    const page=pages.find(p=>p.code===pageCode)||pages[0];const scope=page.code;
    const allowed=scope==='all'?shapeOptions:[['all','Все формы'],...(subgroups[scope]||[]).map(x=>[x,shapeLabels[x]])];
    let state={...defaults(),shape:allowed.some(x=>x[0]===initialShape)?initialShape:'all'};
    const get=id=>products.find(p=>p.id===id);
    const root=()=>app.querySelector('.catalog-shop');
    const query=(s)=>root()?.querySelector(s);
    function set(patch,reset=false){state={...(reset?defaults():state),...patch};if(!allowed.some(x=>x[0]===state.shape))state.shape='all';for(const [key,arr] of [['weight',weights],['price',prices],['sort',sorts]])if(!arr.some(x=>x[0]===state[key]))state[key]=defaults()[key];state.sale=!!state.sale;state.q=String(state.q??'').slice(0,120);refresh();}
    function reset(){set({sort:state.sort},true);}
    function active(){return [['shape',state.shape!=='all'?shapeLabels[state.shape]:null],['weight',state.weight!=='all'?weights.find(x=>x[0]===state.weight)?.[1]:null],['price',state.price!=='all'?prices.find(x=>x[0]===state.price)?.[1]:null],['sale',state.sale?'Со скидкой':null],['q',state.q.trim()?`Поиск: ${state.q.trim()}`:null]].filter(x=>x[1]);}
    function categoryVisual(code){return icons[code]||icons.all;}
    function categoryCards(){return pages.map(p=>{const n=products.filter(q=>shapeMatch(q,p.code)).length;return `<a class="cat-category" href="${pageHref(p)}"${scope===p.code?' aria-current="page"':''}><span class="cat-category-image">${categoryVisual(p.code)}</span><strong>${escape(p.label)}</strong><small>${n} ${plural(n)}</small></a>`;}).join('');}
    function filterControls(prefix){return `<div class="cat-filter-heading"><h2>Фильтры</h2><button type="button" class="cat-text-button" data-cat-action="reset">Сбросить</button></div>
      ${allowed.length>1?`<div class="cat-filter-group"><label for="${prefix}-shape">Форма корзинки</label><select id="${prefix}-shape" data-cat-filter="shape">${options(allowed)}</select></div>`:''}
      <div class="cat-filter-group"><label for="${prefix}-weight">Вес теста до выпечки</label><select id="${prefix}-weight" data-cat-filter="weight">${options(weights)}</select><small>Ориентир — указанная вместимость корзинки.</small></div>
      <div class="cat-filter-group"><label for="${prefix}-price">Цена</label><select id="${prefix}-price" data-cat-filter="price">${options(prices)}</select></div>
      <label class="cat-sale-check"><input type="checkbox" data-cat-filter="sale"><span>Только со скидкой</span><small>${products.filter(p=>shapeMatch(p,scope)&&sale(p)).length}</small></label>`;}
    function render(){const found=selectProducts(products,state,scope);return `<div class="container catalog-shop"><div class="breadcrumb"><a href="v3/index.html">Главная</a> / ${scope==='all'?'Каталог':'<a href="../katalog/">Каталог</a> / '+escape(page.label)}</div>
      <header class="cat-heading"><div><h1>${escape(page.h1)}</h1><p>${escape(page.description)}</p></div><a class="cat-guide" href="../blog/kak-vybrat-korzinku/">Как выбрать корзинку? ↗</a></header>
      <section class="cat-categories" aria-label="Категории товаров"><div class="cat-category-strip">${categoryCards()}</div></section>
      <div class="catalog-layout cat-layout"><aside class="filter-pane cat-sidebar" aria-label="Фильтры каталога">${filterControls('cat-desktop')}<div class="cat-help"><strong>Не уверены в размере?</strong><p>Начните с веса тестовой заготовки по вашему рецепту.</p><a href="../blog/kak-vybrat-korzinku/">Советы по выбору ↗</a></div></aside>
      <section class="catalog-main cat-main" aria-label="Товары"><div class="cat-toolbar"><div class="cat-search"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><input type="search" id="filter-query" data-cat-filter="q" maxlength="120" placeholder="Название или артикул" aria-label="Поиск по каталогу"></div><div class="cat-sort"><select data-cat-filter="sort" id="cat-sort" aria-label="Сортировка товаров">${options(sorts)}</select></div><button type="button" class="cat-filter-trigger" data-cat-action="open" aria-controls="catalog-filter-dialog" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18M8 3v6M16 9v6M10 15v6"/></svg>Фильтры<span data-cat-filter-count hidden></span></button></div>
      <div class="cat-results-head"><span id="results-counter" class="results" role="status" aria-live="polite">Найдено: ${found.length} ${plural(found.length)}</span><div class="cat-chips" data-cat-chips></div></div><div id="catalog-results" class="products-grid">${found.length?found.map(card).join(''):emptyResults()}</div></section></div>
      <dialog id="catalog-filter-dialog" class="cat-filter-dialog" aria-label="Фильтры каталога"><div class="cat-dialog-head"><strong>Подбор товаров</strong><button type="button" class="cat-dialog-close" data-cat-action="close" aria-label="Закрыть фильтры" autofocus>×</button></div><div class="cat-dialog-body">${filterControls('cat-mobile')}</div><div class="cat-dialog-foot"><button type="button" class="btn btn-primary" data-cat-action="close" data-cat-apply>Показать товары</button></div></dialog>
      <section class="cat-description" aria-label="О категории"><h2>${scope==='all'?'Как выбрать корзинку':'О категории'}</h2><p>${escape(page.body)}</p></section><section class="cat-wholesale"><div><h2>Корзинки для пекарни</h2><p>Поможем подобрать нужные формы и количество под ваш ассортимент.</p></div><a class="btn btn-primary" href="../optom/">Оптовым покупателям ↗</a></section></div>`;}
    function card(p,i,withSavings=false){
      const href='#product-'+escape(p.id),name=p.title.endsWith(', '+p.size)?p.title.slice(0,-p.size.length-2):p.title;
      const bread=breadShapes[p.shape]?'v3/assets/bread/'+breadShapes[p.shape]+'.webp':'';
      const loading=i<3?'eager':'lazy';
      const image=p.image?`<img class="real-photo cat-main-photo" src="${escape(p.image)}" alt="${escape(p.exact===false?'Фото аналогичной модели':p.title)}" loading="${loading}" decoding="async">`:'';
      return `<article class="product-card cat-card" data-product-id="${escape(p.id)}"><div class="cat-picture-wrap"><a class="card-picture" href="${href}" aria-label="${escape('Подробнее: '+p.title)}"><div class="product-art cat-art"><div class="woven ${escape(p.shape)}" aria-hidden="true"></div>${image}${bread?`<img class="bread-preview cat-bread-photo" src="${bread}" alt="" aria-hidden="true" loading="lazy" decoding="async">`:''}</div></a>${sale(p)?`<span class="cat-discount">−${discount(p)}%</span>`:''}${bread?'<button type="button" class="cat-preview" data-cat-action="preview" aria-pressed="false" aria-label="Показать пример готового хлеба">Хлеб ↔</button><span class="cat-bread-note">Пример выпечки</span>':''}</div><div class="product-card-content"><span class="cat-sku">${escape(p.sku)}</span><a href="${href}"><h3>${escape(name)}</h3></a><div class="cat-specs"><span class="cat-weight">${escape(p.weight?p.weightText+' теста':p.weightText)}</span><span>${escape(p.size)}</span></div>${p.exact===false?'<small class="photo-analogue">Фото аналога</small>':''}${withSavings===true&&sale(p)?`<span class="cat-saving">Экономия ${fmt(p.oldPrice-p.price)}</span>`:''}<div class="card-buy"><div class="card-prices${sale(p)?' on-sale':''}">${sale(p)?`<del>${fmt(p.oldPrice)}</del>`:''}<strong class="price">${fmt(p.price)}</strong></div><button type="button" class="btn btn-primary btn-sm" data-action="add" data-id="${escape(p.id)}">В корзину ↗</button></div></div></article>`;
    }
    function bundleCard(b,i){
      const images=b.items.map(p=>`<a href="#product-${escape(p.id)}" class="pr-bundle-photo" aria-label="${escape('Подробнее: '+p.title)}"><img src="${escape(p.image)}" alt="${escape(p.exact===false?'Фото аналогичной модели':p.title)}" loading="lazy" decoding="async"></a>`).join('<span class="pr-bundle-plus" aria-hidden="true">+</span>');
      return `<article class="pr-bundle"><div class="pr-bundle-visual"><span class="pr-bundle-label">2 товара</span><div class="pr-bundle-images">${images}</div></div><div class="pr-bundle-content"><span class="cat-sku">Комплект</span><h3>${escape(b.name)}</h3><p>${escape(b.description)}</p><div class="pr-bundle-items">${b.items.map(p=>`<a href="#product-${escape(p.id)}">${escape(p.sku==='Аксессуар'?p.title:p.sku)}</a>`).join('<span aria-hidden="true"> + </span>')}</div><span class="cat-saving">Экономия ${fmt(b.saving)}</span><div class="pr-bundle-price"><strong>${fmt(b.price)}</strong><del>${fmt(b.ordinary)}</del></div><button type="button" class="btn btn-primary btn-sm" data-action="add-bundle" data-id="${escape(b.id)}">В корзину комплект ↗</button></div></article>`;
    }
    function renderPromotions(){
      const {count,maxSaving,discounts,clearance}=promotionSections(products),bundles=promotionBundles(products);
      const sections=[['pr-discounts','Скидки',discounts.length],['pr-clearance','Распродажа',clearance.length],['pr-bundles','Вместе дешевле',bundles.length],['pr-review','Скидка за отзыв и фото',null]];
      const productsGrid=(items,emptyText)=>`<div class="products-grid pr-grid">${items.length?items.map((p,i)=>card(p,i,true)).join(''):`<div class="cat-empty"><p>${escape(emptyText)}</p><a class="btn btn-outline" href="../katalog/">В каталог ↗</a></div>`}</div>`;
      return `<div class="container catalog-shop promotions-shop"><div class="breadcrumb"><a href="v3/index.html">Главная</a> / Акции</div>
      <header class="pr-hero"><div class="pr-copy"><span class="pr-kicker">Специальные предложения</span><h1>Акции</h1><p class="pr-tagline">Больше хлеба. Меньше затрат.</p><p>Выгодные предложения для тех, кто печёт хлеб.</p></div><div class="pr-summary">${count?`<div class="pr-amount"><span>Экономия на товаре до</span><strong>${fmt(maxSaving)}</strong></div><span class="pr-count">${count} ${plural(count)} по специальной цене</span>`:'<span class="pr-count">Новые предложения готовятся</span>'}</div></header>
      <nav class="pr-nav" aria-label="Разделы акций">${sections.map(([id,label,n],i)=>`<a href="../akcii/#${id}" data-scroll="${id}"><span class="pr-nav-icon" aria-hidden="true">${['%','↘','+','♡'][i]}</span><span><strong>${label}</strong><small>${n===null?'5% на следующий заказ · пример':n+' '+(i===2?(n===1?'комплект':n>=2&&n<=4?'комплекта':'комплектов'):plural(n))}</small></span><span class="pr-nav-arrow" aria-hidden="true">↓</span></a>`).join('')}</nav>
      <section class="pr-products pr-section" id="pr-discounts" aria-labelledby="pr-discounts-title"><div class="pr-section-head"><div><h2 id="pr-discounts-title">Скидки</h2><p>Любимые корзинки по сниженным ценам.</p></div><a class="cat-guide" href="../katalog/">Весь каталог ↗</a></div>${productsGrid(discounts,'Сейчас нет товаров со скидкой.')}</section>
      <section class="pr-products pr-section" id="pr-clearance" aria-labelledby="pr-clearance-title"><div class="pr-section-head"><div><h2 id="pr-clearance-title">Распродажа</h2><p>Отдельная подборка выгодных моделей.</p></div><span class="pr-section-note">Демо-подборка</span></div>${productsGrid(clearance,'Подборка обновляется.')}<p class="pr-note">Модели для распродажи показаны для примера; наличие остатков и условия предложения уточняются.</p></section>
      <section class="pr-products pr-section" id="pr-bundles" aria-labelledby="pr-bundles-title"><div class="pr-section-head"><div><h2 id="pr-bundles-title">Вместе дешевле</h2><p>Готовые сочетания корзинок и аксессуаров под разные задачи.</p></div></div><div class="products-grid pr-grid pr-bundles">${bundles.length?bundles.map(bundleCard).join(''):'<div class="cat-empty"><p>Готовые подборки появятся здесь, когда в каталоге будут подходящие предложения.</p></div>'}</div><p class="pr-note">Экономия комплекта — разница между суммой обычных и действующих цен его товаров. Дополнительная скидка за комплект не начисляется.</p></section>
      <section class="pr-section pr-review" id="pr-review" aria-labelledby="pr-review-title"><div class="pr-review-copy"><span class="pr-kicker">Благодарность за ваш опыт</span><h2 id="pr-review-title">Скидка за отзыв и фото</h2><p>Расскажите о своём опыте и покажите хлеб, который испекли. Честный отзыв с фотографией поможет другим хлебопекам выбрать форму.</p><div class="pr-review-steps"><span><b>1</b> Оставьте отзыв</span><span><b>2</b> Добавьте фото</span><span><b>3</b> Получите скидку</span></div><a class="btn btn-primary" href="../otzyvy/?write=1">Оставить отзыв ↗</a><p class="pr-note">Пример будущей акции. Скидка не зависит от оценки; условия и выдача промокодов пока не подключены.</p></div><div class="pr-review-visual"><div class="pr-review-pictures"><img src="assets/review-photos/round-thumb.webp" alt="Демонстрационная иллюстрация круглого хлеба" loading="lazy" decoding="async"><img src="assets/review-photos/oval-thumb.webp" alt="Демонстрационная иллюстрация овального хлеба" loading="lazy" decoding="async"></div><div class="pr-review-reward"><strong>−5%</strong><span>на следующий заказ</span><small>Пример предложения</small></div></div></section>
      <p class="pr-note pr-terms">Цены, распределение товаров по акциям и условия программ — демонстрационные. Перед запуском магазина их необходимо подтвердить.</p>
      <section class="pr-help"><div><h2>Не уверены, какая корзинка подойдёт?</h2><p>Подберите форму и размер по весу теста в нашем интерактивном руководстве.</p></div><a class="btn btn-outline" href="../blog/kak-vybrat-korzinku/">Как выбрать корзинку ↗</a></section></div>`;
    }
    function sync(){const r=root();if(!r)return;r.querySelectorAll('[data-cat-filter]').forEach(el=>{const k=el.dataset.catFilter;if(el.type==='checkbox'){el.checked=!!state[k];}else if(el.value!==String(state[k]))el.value=String(state[k]);});const a=active();const b=r.querySelector('[data-cat-filter-count]');if(b){const count=a.filter(x=>x[0]!=='q').length;b.hidden=!count;b.textContent=count||'';}r.querySelectorAll('[data-cat-chips]').forEach(el=>{el.innerHTML=a.map(([k,v])=>`<button type="button" data-cat-clear="${k}" class="cat-chip" aria-label="Убрать фильтр: ${escape(v)}"><span>${escape(v)}</span><span aria-hidden="true">×</span></button>`).join('')+(a.length>1?'<button type="button" class="cat-text-button" data-cat-action="reset">Сбросить всё</button>':'');});}
    function emptyResults(){if(scope!=='all'&&!products.some(p=>shapeMatch(p,scope)))return '<div class="cat-empty"><h2>Ассортимент раздела уточняется</h2><p>Пока модели этой категории не добавлены в каталог. Посмотрите раздел действующего магазина.</p><a class="btn btn-outline" href="https://hleb-forma.ru'+escape(page.legacyPath)+'">Посмотреть товары ↗</a></div>';return '<div class="cat-empty"><h2>Нет подходящих товаров</h2><p>Попробуйте изменить форму, вес теста или диапазон цен.</p><button type="button" class="btn btn-outline" data-cat-action="reset">Сбросить фильтры</button></div>';}
    function refresh(){const r=root();if(!r||!r.querySelector('#catalog-results'))return;sync();const found=selectProducts(products,state,scope);const area=r.querySelector('#catalog-results');area.innerHTML=found.length?found.map(card).join(''):emptyResults();const n=found.length;r.querySelector('#results-counter').textContent=`Найдено: ${n} ${plural(n)}`;const apply=r.querySelector('[data-cat-apply]');if(apply)apply.textContent=`Показать ${n} ${plural(n)}`;}
    function closeFilter(restore=true){const dlg=query('#catalog-filter-dialog');const trigger=query('[data-cat-action="open"]');if(dlg?.open)dlg.close();document.body.classList.remove('catalog-filter-open');trigger?.setAttribute('aria-expanded','false');if(restore&&trigger&&trigger.offsetParent)trigger.focus({preventScroll:true});}
    function openFilter(){const dlg=query('#catalog-filter-dialog');if(!dlg||dlg.open)return;dlg.showModal();document.body.classList.add('catalog-filter-open');query('[data-cat-action="open"]')?.setAttribute('aria-expanded','true');}
    app.addEventListener('click',e=>{
      const r=root();if(!r||!r.contains(e.target))return;
      const chip=e.target.closest('[data-cat-clear]');if(chip){const k=chip.dataset.catClear;if(Object.hasOwn(defaults(),k))set({[k]:defaults()[k]});query('#filter-query')?.focus({preventScroll:true});return;}
      const btn=e.target.closest('[data-cat-action]');if(btn){switch(btn.dataset.catAction){case 'reset':reset();break;case 'open':openFilter();break;case 'close':closeFilter();break;case 'preview':{const article=btn.closest('.cat-card');const on=article.classList.toggle('cat-show-bread');btn.setAttribute('aria-pressed',String(on));btn.setAttribute('aria-label',on?'Показать корзинку':'Показать пример готового хлеба');btn.textContent=on?'Корзинка ↔':'Хлеб ↔';break;}}return;}
      const dlg=query('#catalog-filter-dialog');if(dlg?.open&&e.target===dlg){const rect=dlg.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)closeFilter();}
    });
    app.addEventListener('input',e=>{if(e.target.dataset.catFilter==='q')set({q:e.target.value});});
    app.addEventListener('change',e=>{const k=e.target.dataset.catFilter;if(k&&k!=='q'&&Object.hasOwn(defaults(),k))set({[k]:e.target.type==='checkbox'?e.target.checked:e.target.value});});
    app.addEventListener('close',e=>{if(e.target.id==='catalog-filter-dialog'&&!e.target.open){document.body.classList.remove('catalog-filter-open');query('[data-cat-action="open"]')?.setAttribute('aria-expanded','false');}},true);
    app.addEventListener('error',e=>{const img=e.target;if(img.matches?.('.cat-main-photo,.cat-bread-photo,.cat-category-image img'))img.remove();},true);
    const mq=window.matchMedia('(max-width: 880px)');const onResize=()=>{if(!mq.matches&&query('#catalog-filter-dialog')?.open)closeFilter(false);};if(mq.addEventListener)mq.addEventListener('change',onResize);else mq.addListener(onResize);
    return Object.freeze({render,renderPromotions,refresh,sync,set,reset,closeFilter,getFilters:()=>({...state})});
  }
  window.HlebCatalog=Object.freeze({create,defaults,matches,selectProducts,shapeMatch,pages,promotionMeta,promotionStats,promotionSections,promotionBundles,bundleCart});
})();