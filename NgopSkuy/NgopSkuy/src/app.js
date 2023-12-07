document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta", img: "1.jpg.jpg", price: 25000 },
      { id: 2, name: "Arabian", img: "2.jpg.jpg", price: 32000 },
      { id: 3, name: "Aceh Gayo", img: "3.jpg.jpg", price: 40000 },
      { id: 4, name: "Lombok Coffee", img: "4.jpg.jpg", price: 46000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek barang yang sama
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //barang sama atau beda berada di cart
        this.items = this.items.map((item) => {
          //barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //barang sudah ada
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      //item yang diremove
      const cartItem = this.items.find((item) => item.id === id);

      //item lebih dari satu
      if (cartItem.quantity > 1) {
        //telusuri satu-persatu
        this.items = this.items.map((item) => {
          //bukan barang yang dipilih
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        //barang sisa satu
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

//Rupiah
const Rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
