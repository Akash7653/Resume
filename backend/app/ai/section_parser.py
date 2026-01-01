import re
from dataclasses import dataclass
from typing import Dict, List, Optional, Set, Tuple
from enum import Enum
import unicodedata

class SectionType(Enum):
    CONTACT = "contact"
    SUMMARY = "summary"
    SKILLS = "skills"
    EXPERIENCE = "experience"
    EDUCATION = "education"
    PROJECTS = "projects"
    CERTIFICATIONS = "certifications"
    LANGUAGES = "languages"
    AWARDS = "awards"
    PUBLICATIONS = "publications"
    VOLUNTEER = "volunteer"
    INTERESTS = "interests"
    REFERENCES = "references"
    CUSTOM = "custom"

@dataclass
class Section:
    type: SectionType
    name: str
    content: str
    start_line: int
    end_line: int
    level: int = 1
    parent_section: Optional['Section'] = None
    subsections: List['Section'] = None

    def __post_init__(self):
        if self.subsections is None:
            self.subsections = []

# Expanded section aliases with common variations
SECTION_ALIASES = {
    SectionType.CONTACT: ["contact", "contact info", "contact information", "personal details", "personal information"],
    SectionType.SUMMARY: ["summary", "profile", "about", "about me", "career objective", "objective", "professional summary"],
    SectionType.SKILLS: ["skills", "technical skills", "core competencies", "technical expertise", "key skills", "professional skills"],
    SectionType.EXPERIENCE: ["experience", "work experience", "employment history", "professional experience", "work history"],
    SectionType.EDUCATION: ["education", "academic background", "academic qualifications", "education & training"],
    SectionType.PROJECTS: ["projects", "academic projects", "personal projects", "key projects", "project experience"],
    SectionType.CERTIFICATIONS: ["certifications", "certificates", "licenses", "professional certifications"],
    SectionType.LANGUAGES: ["languages", "language skills", "language proficiency"],
    SectionType.AWARDS: ["awards", "honors & awards", "achievements"],
    SectionType.PUBLICATIONS: ["publications", "research papers", "papers"],
    SectionType.VOLUNTEER: ["volunteer work", "volunteer experience", "volunteering"],
    SectionType.INTERESTS: ["interests", "hobbies"],
    SectionType.REFERENCES: ["references", "professional references"]
}

class ResumeParser:
    """
    A comprehensive resume parser that extracts and structures resume sections.
    Handles various resume formats and normalizes section headers.
    """
    
    def __init__(self):
        # Compile regex patterns for section detection
        self.section_patterns = {
            section: re.compile(
                r'^(?P<header>' +
                '|'.join(re.escape(alias) + r's?\b' for alias in SECTION_ALIASES.get(section, [])) +
                r')\s*[:\\.]?\s*$',
                re.IGNORECASE
            )
            for section in SECTION_ALIASES
        }
        
        # Common section headers that might be on their own line
        self.common_headers = set()
        for aliases in SECTION_ALIASES.values():
            self.common_headers.update(alias.lower() for alias in aliases)
    
    def normalize_text(self, text: str) -> str:
        """
        Strong text normalizer that handles broken headers and special characters.
        """
        text = unicodedata.normalize("NFKD", text)
        text = "".join(c for c in text if not unicodedata.combining(c))
        text = text.lower()
        
        # Remove everything except letters
        # "SK ILLS" -> "skills"
        # "EDUCATIO N" -> "education"
        text = re.sub(r"[^a-z]", "", text)
        
        return text
    
    def is_section_header(self, line: str, next_line: Optional[str] = None) -> Optional[Tuple[SectionType, str]]:
        """
        Check if the current line is a section header.
        Returns (section_type, normalized_header) if it is a header, None otherwise.
        """
        line = line.strip()
        if not line:
            return None
            
        # Check for common section headers
        normalized_line = self.normalize_text(line)
        
        # Check if line matches any section header pattern
        for section_type, pattern in self.section_patterns.items():
            match = pattern.match(line)
            if match:
                return section_type, match.group('header').strip().lower()
        
        # Check for section headers that might be followed by a line of dashes or equals
        if next_line and (next_line.strip().startswith(('-', '=')) and len(next_line.strip()) >= len(line)):
            for section_type, aliases in SECTION_ALIASES.items():
                for alias in aliases:
                    if self.normalize_text(alias) == normalized_line:
                        return section_type, alias.lower()
        
        # Check for all-caps section headers
        if line.isupper() and len(line) < 30:  # Reasonable max length for section headers
            normalized = self.normalize_text(line)
            for section_type, aliases in SECTION_ALIASES.items():
                for alias in aliases:
                    if normalized == self.normalize_text(alias):
                        return section_type, alias.lower()
        
        return None
    
    def is_experience_line(self, line: str) -> bool:
        keywords = [
            "engineer", "developer", "intern", "sde",
            "company", "fintech", "worked", "experience",
            "software", "remote", "role"
        ]
        return any(k in line.lower() for k in keywords)
    
    def parse_sections(self, text: str) -> Dict[SectionType, Section]:
        """
        Parse the resume text into structured sections.
        
        Args:
            text: The raw resume text
            
        Returns:
            Dictionary mapping section types to Section objects
        """
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        sections = {}
        current_section = None
        current_content = []
        
        i = 0
        while i < len(lines):
            line = lines[i]
            next_line = lines[i+1] if i+1 < len(lines) else None
            
            # Check if current line is a section header
            header_info = self.is_section_header(line, next_line)
            
            if header_info:
                section_type, header_text = header_info
                
                # Save previous section if exists
                if current_section and current_content:
                    if current_section in sections:
                        sections[current_section].content += "\n" + '\n'.join(current_content).strip()
                    else:
                        sections[current_section] = Section(
                            type=current_section,
                            name=current_section.value,
                            content='\n'.join(current_content).strip(),
                            start_line=0,  # This would need to be tracked properly in a real implementation
                            end_line=i-1
                        )
                    current_content = []
                
                # Skip the underline if present
                if next_line and next_line.strip().startswith(('-', '=')) and len(next_line.strip()) >= len(line):
                    i += 1
                
                # Start new section
                current_section = section_type
                
                # Skip to next line after header
                i += 1
                continue
            
            # Add line to current section content
            if current_section:
                if (
                    current_section != SectionType.EXPERIENCE
                    and self.is_experience_line(line)
                ):
                    i += 1
                    continue

                current_content.append(line)
            
            i += 1
        
        # Add the last section
        if current_section and current_content:
            sections[current_section] = Section(
                type=current_section,
                name=current_section.value,
                content='\n'.join(current_content).strip(),
                start_line=0,  # This would need to be tracked properly in a real implementation
                end_line=len(lines)-1
            )
        
        return sections
    
    def get_section(self, text: str, section_type: SectionType) -> Optional[Section]:
        """Get a specific section from the resume text."""
        sections = self.parse_sections(text)
        return sections.get(section_type)
    
    def get_section_content(self, text: str, section_type: SectionType) -> Optional[str]:
        """Get the content of a specific section from the resume text."""
        section = self.get_section(text, section_type)
        return section.content if section else None
