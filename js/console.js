var cssRule =
  "color: red;" +
  "background-color: yellow;" +
  "font-size: 50px;" +
  "font-weight: bold;" +
  "text-shadow: 1px 1px 5px rgb(249, 162, 34);" +
  "filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);";
console.log("%cWarning!", cssRule);

var cssRule =
  "color: black;" +
  "font-size: 20px;" +
  "font-weight: arial;" +
  "text-shadow: none;" +
  "filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);";
console.log(
  "%cUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.Do not enter or paste code that you do not understand.",
  cssRule
);
