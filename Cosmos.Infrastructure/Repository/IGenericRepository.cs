using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Cosmos.Model.Entities.Organization;

namespace Cosmos.Infrastructure.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        List<T> GetAll(Expression<Func<T, bool>> predicate = null);

        Task<List<T>> GetAllAsync(Expression<Func<T, bool>> predicate = null);

        IQueryable<T> GetAllIQueryable(Expression<Func<T, bool>> predicate = null);

        T Get(Expression<Func<T, bool>> predicate);

        Task<T> GetAsync(Expression<Func<T, bool>> predicate = null);

        Task<T> Find(long id);

        void Add(T entity);
        void Add(IEnumerable<T> entity);
        void Update(T entity);
        void Update(IEnumerable<T> entity);
        void Delete(T entity);
        void Delete(IEnumerable<T> entity);

        Task SaveChangesAsync();

        List<T> ExecuteQuery(string query);
        Task<List<T>> ExecuteQueryAsync(string query);

    }
}
