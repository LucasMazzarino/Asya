const Map = () => {
  return (
    <div className="relative w-full h-0 pb-[56.25%] md:pb-[75%] lg:pb-[50%] xl:pb-[130%] xl:px-[120%] overflow-hidden rounded-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3276.077442347597!2d-55.899515523366!3d-34.80399346810436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f8a5a05be32fb%3A0x6f6e36b71f791e76!2sPrecursores%2C%2015800%20Ciudad%20de%20la%20Costa%2C%20Departamento%20de%20Canelones!5e0!3m2!1ses-419!2suy!4v1722035119811!5m2!1ses-419!2suy"
        className="absolute top-0 left-0 w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;