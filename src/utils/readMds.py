import re
from pathlib import Path
import json
from deep_translator import GoogleTranslator 

translator = GoogleTranslator(source='spanish', target='english')




ruta_directorio_codigo = Path(__file__).resolve().parent

ruta_a_leer = ruta_directorio_codigo / Path( "..")/ "content" / "originals"

titles = {}



for archivo in ruta_a_leer.iterdir():
  with open(archivo,"r",encoding="utf-8") as file :
    readed_file = file.read()
    regex = r"title:\s\"([^\"]*)\""
    result = re.search(regex,readed_file)
    
    if result: 
      new_result = result.group(1)
      traducido = translator.translate(new_result)
      
      print(traducido)
      
      result3 = new_result.replace(" ",'-')
      titles[result3] = ""
print(titles)

nombre_archivo = "datos.json"

with open(nombre_archivo, 'w', encoding='utf-8') as archivo_salida:
    # Escribe los datos en el archivo en formato JSON
    json.dump(titles, archivo_salida, indent=4, ensure_ascii=False)

print(f"Archivo '{nombre_archivo}' creado exitosamente con formato JSON.")