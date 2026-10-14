-- Repeat business constraints for callers that use the Data API directly.
alter table public.companies add constraint company_slug_valid
 check (char_length(slug) between 2 and 150 and slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
alter table public.company_locations add constraint company_city_valid
 check (char_length(trim(city)) between 2 and 100);
alter table public.company_representatives add constraint representative_evidence_required
 check (verification_evidence is not null and char_length(trim(verification_evidence)) between 30 and 2000);

create function private.validate_employment_years() returns trigger
language plpgsql set search_path = '' as $$
begin
 if new.employment_start > extract(year from current_date)
  or new.employment_end > extract(year from current_date)
 then raise exception 'employment years cannot be in the future' using errcode='22023'; end if;
 return new;
end;$$;
revoke all on function private.validate_employment_years() from public,anon,authenticated;
create trigger review_employment_years before insert or update on public.reviews
for each row execute function private.validate_employment_years();
