import re
from pathlib import Path
import os
from deep_translator import GoogleTranslator 

translator = GoogleTranslator( target='english')
ruta_directorio_codigo = Path(__file__).resolve().parent
ruta_a_leer = ruta_directorio_codigo / Path( "..")/ "content" / "originals"




for archivo in ruta_a_leer.iterdir():
  carpeta_a_guardar = archivo.parent.parent / "platos"
  archivo_a_guardar = carpeta_a_guardar / archivo.name.replace("-es","-en")
  
  # if os.path.exists(archivo_a_guardar): 
  #   print(f"el archivo: {archivo_a_guardar.name} ya existe (obviamos la traduccion)")
  #   continue
  
  
  with open(archivo ,"r",encoding="utf-8") as read :
    with open (archivo_a_guardar,"w",encoding="utf-8") as write:       
      readed_file = read.read()
      write.write(readed_file)
      
      continue
      search__context__regex = r"---.*?---(.*)"
      remplace_lang_regex = r"lang\s:\s\"([^\"]*)\""
      remplace_type_regex = r"type:\s\"([^\"]*)\""
      remplace_title_regex = r"title:\s\"([^\"]*)\""
      
      
      rest_of_text = re.search(search__context__regex,readed_file,flags=re.DOTALL).group(1)
      new_lang = re.search(remplace_lang_regex,readed_file,flags=re.DOTALL).group(1)
      new_type = re.search(remplace_type_regex,readed_file,flags=re.DOTALL).group(1)
      new_title = re.search(remplace_title_regex,readed_file,flags=re.DOTALL).group(1)
            
      traducido = translator.translate(rest_of_text)
      traducido2 = translator.translate(new_type)
      traducido3 = translator.translate(new_title)
      
      result = readed_file.replace(rest_of_text,f"\n\n${traducido}")
      result2 = result.replace(new_lang,"en")
      result3 = result2.replace(new_type,traducido2)
      result4 = result3.replace(new_title,traducido3)
      
      
      
      write.write(result4)
      
      print(f"Archivo {archivo_a_guardar.name} Guardado correctamente")
      
# print(titles)

# nombre_archivo = "datos.json"

# with open(nombre_archivo, 'w', encoding='utf-8') as archivo_salida:
#     # Escribe los datos en el archivo en formato JSON
#     json.dump(titles, archivo_salida, indent=4, ensure_ascii=False)

# print(f"Archivo '{nombre_archivo}' creado exitosamente con formato JSON.")