import { HttpClient } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';

export class CrudService<T> {

  constructor(
    protected http: HttpClient,
    private API_URL
  ) { }

  list() {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(2000),
        tap()
      );
  }

  loadByID(id) {
    return this.http
      .get<T>(`${this.API_URL}/${id}`)
      .pipe(take(1));
  }

  private create(record) {
    return this.http
      .post(this.API_URL, record)
      .pipe(take(1));
  }

  private update(record) {
    return this.http
      .put(`${this.API_URL}/${record.id}`, record)
      .pipe(take(1));
  }

  save(record) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  deletar(record) {
    return this.http
    .delete(`${this.API_URL}/${record.id}`, record)
    .pipe(take(1));
  }

}
