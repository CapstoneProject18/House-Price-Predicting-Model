using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Capstone
{
    class Data
    {
        public string x { get; set; }
        public string y { get; set; }
        public Data(string a, string b)
        {
            x = a;
            y = b;
        }
    }

    static class Program
    {
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
        {
            HashSet<TKey> seenKeys = new HashSet<TKey>();
            foreach (TSource element in source)
            {
                if (seenKeys.Add(keySelector(element)))
                {
                    yield return element;
                }
            }
        }
        public static void WriteCSV<T>(IEnumerable<T> items, string path)
        {
            Type itemType = typeof(T);
            var props = itemType.GetProperties(BindingFlags.Public | BindingFlags.Instance).OrderBy(p => p.Name);

            using (var writer = new StreamWriter(path))
            {
                foreach (var item in items)
                    writer.WriteLine(string.Join(", ", props.Select(p => p.GetValue(item, null))));
            }
        }
        static void Main(string[] args)
        {
            using (var reader = new StreamReader(@"C:\\Users\\Uddal\\Downloads\\Compressed\\House-Price-Predicting-Model-master\\eg.csv"))
            {
                List<Data> listA = new List<Data>();
                while (!reader.EndOfStream)
                { 
                    var line = reader.ReadLine();
                    var values = line.Split(',');
                    listA.Add(new Data(values[0], values[1]));
                }
                listA = listA.DistinctBy(p=>p.x).ToList();
                WriteCSV(listA, "C:\\Users\\Uddal\\Downloads\\Compressed\\House-Price-Predicting-Model-master\\eg(1).csv");
            }
        }
    }
}
