-- crear bd y listar(ver) con \l
-- para acceder a una bd = \c nombreBD
-- se crearan las tablas en orden para que las lea la terminal y asi evitar fallos

-- Se ocupará una notación C, ocupando el separador "_" --> ej: Tipo_venta

CREATE DATABASE MrPersonality;

-- tabla para el admin
CREATE TABLE IF NOT EXISTS admin(
    id_admin integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text NOT NULL,
    correo text NOT NULL,
    password text NOT NULL,
    imagen text
);

-- tablas para los productos
CREATE TABLE IF NOT EXISTS Categoria(
    id_categoria integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text NOT NULL,
    UNIQUE (nombre)
);

CREATE TABLE IF NOT EXISTS Talla(
    id_talla integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text NOT NULL,
    UNIQUE (nombre)
);

CREATE TABLE IF NOT EXISTS Color(
    id_color integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text NOT NULL,
    UNIQUE (nombre)
);

CREATE TABLE IF NOT EXISTS Tipo(
    id_tipo integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text NOT NULL,
    UNIQUE (nombre)
);

CREATE TABLE IF NOT EXISTS Producto(
    id_producto integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text NOT NULL,
    descripcion text,
    stock integer NOT NULL,
    empaque integer NOT NULL,
    intereses_tarjeta integer NOT NULL,
    FFEE_traslado integer NOT NULL,
    precio integer NOT NULL,
    imagen text,
    id_categoria integer REFERENCES Categoria(id_categoria),
    id_talla integer REFERENCES Talla(id_talla),
    id_color integer REFERENCES Color(id_Color),
    id_tipo integer REFERENCES Tipo(id_tipo),
    id_admin integer REFERENCES admin(id_admin)
);

-- tablas para los proveedores
CREATE TABLE IF NOT EXISTS Proveedor(
    id_proveedor integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    rut text,
    nombre text,
    nombre_contacto text,
    correo text NOT NULL,
    direccion text,
    telefono text
);

CREATE TABLE IF NOT EXISTS Abastece(
    id_abastece integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    fecha timestamp,
    id_proveedor integer REFERENCES Proveedor(id_proveedor)
);

CREATE TABLE IF NOT EXISTS Detalle_abastece(
    id_detalle_abastece integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    cantidad integer NOT NULL,
    costo_unitario integer NOT NULL,
    id_abastece integer REFERENCES Abastece(id_abastece),
    id_producto integer REFERENCES Producto(id_producto)
);

-- tablas para los clientes
CREATE TABLE IF NOT EXISTS Comuna(
    id_comuna integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text NOT NULL, 
    UNIQUE (nombre)
);

CREATE TABLE IF NOT EXISTS Region(
    id_region integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text NOT NULL, 
    UNIQUE (nombre)
);

CREATE TABLE IF NOT EXISTS Cliente(
    id_cliente integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text NOT NULL,
    correo text,
    direccion text,
    telefono text,
    user_instagram text,
    id_comuna integer REFERENCES Comuna(id_comuna),
    id_region integer REFERENCES Region(id_region)
);

-- tablas para las compras
CREATE TABLE IF NOT EXISTS Tipo_pago(
    id_tipo_pago integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    tipo_pago text NOT NULL,
    UNIQUE (tipo_pago)
);

CREATE TABLE IF NOT EXISTS Compra(
    id_compra integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    fecha text NOT NULL,
    id_tipo_pago integer REFERENCES Tipo_pago(id_tipo_pago),
    id_cliente integer REFERENCES Cliente(id_cliente)
);

CREATE TABLE IF NOT EXISTS Tipo_compra(
    id_tipo_compra integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    tipo_compra text NOT NULL,
    UNIQUE (tipo_compra)
);

CREATE TABLE IF NOT EXISTS Detalle_compra(
    id_detalle_compra integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    cantidad integer NOT NULL,
    otros_gastos integer,
    id_producto integer REFERENCES Producto(id_producto),
    id_compra integer REFERENCES Compra(id_compra),
    id_tipo_compra integer REFERENCES Tipo_compra(id_tipo_compra)
);


