-- Reference taxonomy only. No company, review, salary, or interview fixtures are seeded.
insert into public.industries(name,slug) values
 ('Teknologi','teknologi'),
 ('Keuangan','keuangan'),
 ('Kesehatan','kesehatan'),
 ('Pendidikan','pendidikan'),
 ('Manufaktur','manufaktur'),
 ('Ritel dan E-commerce','ritel-ecommerce'),
 ('Konsultan dan Jasa Profesional','konsultan-jasa'),
 ('Media dan Kreatif','media-kreatif'),
 ('Logistik dan Transportasi','logistik-transportasi'),
 ('Energi dan Sumber Daya','energi-sumber-daya'),
 ('Perhotelan dan Pariwisata','perhotelan-pariwisata'),
 ('Organisasi Nirlaba','organisasi-nirlaba'),
 ('Lainnya','lainnya')
on conflict(slug) do update set name=excluded.name,is_active=true;
