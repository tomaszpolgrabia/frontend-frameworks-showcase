create table persons (
	id integer primary key autoincrement,
	firstName text not null,
	lastName text not null,
	email varchar(256) not null,
	status integer default 0
	created_at date not null default datetime('now', 'localtime'),
	updated_at date not null default datetime('now', 'localtime')
);

create trigger update_at_persons 
	after update on persons 
begin 
	update persons 
		set updated_at = datetime('now', 'localtime')
		where id = old.id; 
end;
