declare const Swiper: any;
console.log(typeof Swiper); // "function" と表示されれば正しく読み込まれています
interface Window {
    toggleMenu: () => void;
}