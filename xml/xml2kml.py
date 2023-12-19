# 02010-XPath.py
# # -*- coding: utf-8 -*-
""""
Ejemplos de uso de XPath

@version 1.2 21/Octubre/2020
@author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
"""

import xml.etree.ElementTree as ET

def verXPath(archivoXML, expresionXPath):
    """Función verXPath(archivoXML, expresionXPath)
Visualiza por pantalla el nodo correspondiente de una expresión XPath de un archivo XML
    
Version: 1.2 21/Octubre/2020
Author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
    """
    try:     
        arbol = ET.parse(archivoXML)
        
    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        exit()
        
    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()
       
    raiz = arbol.getroot()

    coordenadas = []
    for hijo in raiz.findall(expresionXPath): # Expresión XPath
        coordenadas.append(hijo.attrib)
    
    return coordenadas

def crearArchivoKML(coordenadas, nombreArchivoKML):
    with open(nombreArchivoKML, 'w') as archivo:
        archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
        archivo.write('<Document>\n')
        archivo.write(f'<Placemark>\n')
        archivo.write('<LineString>\n')
        archivo.write(f'<extrude>1</extrude>\n')
        archivo.write(f'<tessellate>1</tessellate>\n')
        archivo.write(f'<coordinates>\n')
        
        for coordenada in coordenadas:
            coordenada_values = list(coordenada.values())
            coordenada_values[0], coordenada_values[1] = coordenada_values[1], coordenada_values[0]
            archivo.write(','.join([str(valor) for valor in coordenada_values]) + '\n')
       
        archivo.write(f'</coordinates>\n')
        archivo.write('</LineString>\n')
        archivo.write('<Style id=\'lineaRoja\'>\n')
        archivo.write('<LineStyle>\n')
        archivo.write('<color>#ff0000ff</color>\n')
        archivo.write('<width>5</width>\n')
        archivo.write('</LineStyle>\n')
        archivo.write('</Style>\n')
        archivo.write('</Placemark>\n')
        archivo.write('</Document>\n')
        archivo.write('</kml>\n')

def main():
    """Prueba de la función verXPath()"""

    miArchivoXML = "rutasEsquema.xml"

    miExpresionXPath1 = ".//{http://www.uniovi.es}ruta[1]//{http://www.uniovi.es}coordenadasInicio"
    miExpresionXPath2 = ".//{http://www.uniovi.es}ruta[2]//{http://www.uniovi.es}coordenadasInicio"
    miExpresionXPath3 = ".//{http://www.uniovi.es}ruta[3]//{http://www.uniovi.es}coordenadasInicio"

    coordenadas1 = verXPath(miArchivoXML, miExpresionXPath1)
    print()
    coordenadas2 = verXPath(miArchivoXML, miExpresionXPath2)
    print()
    coordenadas3 = verXPath(miArchivoXML, miExpresionXPath3)

    crearArchivoKML(coordenadas1,"ruta1.kml")
    crearArchivoKML(coordenadas2,"ruta2.kml")
    crearArchivoKML(coordenadas3,"ruta3.kml")

if __name__ == "__main__":
    main()    
