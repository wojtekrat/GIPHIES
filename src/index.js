import 'babel-polyfill';
import Navbar from './Navbar';
import Searchbar from "./Searchbar";
import Api from "./Api";

new Navbar();
new Searchbar();
new Api().randomGifs();