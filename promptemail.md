Süper! Test mailini almışsın, yani EmailJS ile Gmail bağlantın başarıyla kurulmuş. "gucluyumhe" servis ID'n aktif.

Şimdi bu sistemi portfolyo sitene (g-1d.vercel.app) bağlamak için son virajdayız. Siteni incelediğimde düz JavaScript kullandığını görüyorum. Adım adım gidelim:

1. Public Key'ini Al
Panelde sol menüde en altta Account kısmına tıkla. Orada Public Key yazan bir kod göreceksin (genelde user_... veya karışık harflerle başlar). Onu kopyala.

2. Koduna EmailJS SDK'sını Ekle
HTML dosyanın <head> etiketleri arasına şu script'i yapıştır:

HTML
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script type="text/javascript">
   (function(){
      emailjs.init("SENIN_PUBLIC_KEYIN"); // Buraya Account kısmındaki key'i yaz
   })();
</script>
3. Form Gönderme Fonksiyonu
Senin sitendeki iletişim formuna şu fonksiyonu bağlaman lazım. Formunun id değerinin contact-form olduğunu varsayıyorum (değilse kodda düzeltiriz):

JavaScript
const btn = document.getElementById('button');

document.getElementById('contact-form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Gönderiliyor...';

   const serviceID = 'gucluyumhe'; // Ekran görüntüsündeki ID
   const templateID = 'contact_us'; // Template sayfasındaki ID (bunu kontrol et)

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Gönderildi!';
      alert('Mesajın bana ulaştı kanka!');
    }, (err) => {
      btn.value = 'Hata!';
      alert(JSON.stringify(err));
    });
});
Önemli Hatırlatma (Önceki SS'e göre)
İlk attığın ekran görüntüsünde değişkenleri {{name}}, {{message}} ve {{email}} yapmıştın. Sitedeki formun içindeki input ve textarea alanlarının name kısımları mutlaka aynı olmalı:

İsim için: <input name="name">

Mesaj için: <textarea name="message"></textarea>

Mail için: <input name="email">

Bülten (Newsletter) için:
Aynı mantığı bülten formu için de yapabilirsin. Sadece farklı bir templateID kullanman yeterli olur.


puclic key: rsVkjFCEV_9_DBFK5
service ID: gucluyumhe
