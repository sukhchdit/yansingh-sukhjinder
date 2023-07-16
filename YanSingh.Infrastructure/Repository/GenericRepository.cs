using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using YanSingh.DAL;
using YanSingh.Model.Entities.Organization;
using Microsoft.EntityFrameworkCore;

namespace YanSingh.Infrastructure.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private CosmosDbContext CurrentContext;

        public GenericRepository(CosmosDbContext _currentContext)
        {
            CurrentContext = _currentContext;
        }
        public List<T> GetAll(Expression<Func<T, bool>> predicate = null)
        {
            try
            {
                if (predicate != null)
                    return CurrentContext.Set<T>().Where(predicate).ToList();
                else
                    return CurrentContext.Set<T>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<T>> GetAllAsync(Expression<Func<T, bool>> predicate = null)
        {
            try
            {
                if (predicate != null)
                    return await CurrentContext.Set<T>().Where(predicate).ToListAsync();
                else
                    return await CurrentContext.Set<T>().ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IQueryable<T> GetAllIQueryable(Expression<Func<T, bool>> predicate = null)
        {
            try
            {
                if (predicate != null)
                    return CurrentContext.Set<T>().Where(predicate);
                else
                    return CurrentContext.Set<T>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public T Get(Expression<Func<T, bool>> predicate = null)
        {
            try
            {
                if (predicate != null)
                    return CurrentContext.Set<T>().Where(predicate).FirstOrDefault();
                else
                    return CurrentContext.Set<T>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
                //throw ex;
            }
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> predicate = null)
        {
            try
            {
                if (predicate != null)
                    return await CurrentContext.Set<T>().Where(predicate).FirstOrDefaultAsync();
                else
                    return await CurrentContext.Set<T>().FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<T> Find(long id)
        {
            try
            {
                return await CurrentContext.Set<T>().FindAsync(id);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public void Add(T entity)
        {
            try
            {
                CurrentContext.Set<T>().AddAsync(entity);
            }
            catch (Exception ex)
            {

            }
        }

        public void Add(IEnumerable<T> entity)
        {
            try
            {
                CurrentContext.Set<T>().AddRangeAsync(entity);
            }
            catch (Exception ex)
            {
                //return null;
            }
        }


        public void Update(T entity)
        {
            //CurrentContext.Entry<T>(entity).State = EntityState.Modified;
            try
            {
                CurrentContext.Set<T>().Update(entity);
            }
            catch (Exception ex)
            {
                //return null;
            }
        }
        public void Update(IEnumerable<T> entity)
        {
            //CurrentContext.Entry<T>(entity).State = EntityState.Modified;
            try
            {
                CurrentContext.Set<T>().UpdateRange(entity);
            }
            catch (Exception ex)
            {
                //return null;
            }
        }

        public void Delete(T entity)
        {
            try
            {
                CurrentContext.Set<T>().Remove(entity);
            }
            catch (Exception ex)
            {
                //return null;
            }
        }
        public void Delete(IEnumerable<T> entity)
        {
            // if(entity.Count>0)
            try
            {
                CurrentContext.Set<T>().RemoveRange(entity);
            }
            catch (Exception ex)
            {
                //return null;
            }
        }
        public async Task SaveChangesAsync()
        {
            try
            {
                await CurrentContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<T> ExecuteQuery(string query)
        {
            try
            {
                return CurrentContext.Set<T>().FromSqlRaw(query).ToList();

            }
            catch (Exception exp)
            {
                throw exp;
            }
        }

        public async Task<List<T>> ExecuteQueryAsync(string query)
        {
            try
            {
                return await CurrentContext.Set<T>().FromSqlRaw(query).ToListAsync();

            }
            catch (Exception exp)
            {
                throw exp;
            }
        }

    }
}
